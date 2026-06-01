import { useEffect, useState } from "react";
import "../css_pages/ListPage.css";

const URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json",
};

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M2.5 7L5.5 10L11.5 4"
        stroke="#1A1A1A"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M7 5l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M5 7l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ItemPanel({ item, onClose, onSave, onDelete }) {
  const isNew = !item.id;
  const [title, setTitle] = useState(item.title || "");
  const [qty, setQty] = useState(item.qty || 1);
  const [unit, setUnit] = useState(item.unit || "");

  function handleSave() {
    if (!title.trim()) return;
    onSave({ title: title.trim(), qty, unit });
  }

  return (
    <div
      className="overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="panel">
        <div className="panel-handle" />
        <h2>{isNew ? "Tilføj vare" : "Rediger vare"}</h2>

        <div className="field">
          <div className="field-label">Vare</div>
          <input
            className="text-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Fx. Mælk, Æbler..."
            autoFocus
          />
        </div>

        <div className="field">
          <div className="field-label">Antal</div>
          <div className="qty-row">
            <button
              className="qty-btn"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
            >
              −
            </button>
            <span className="qty-display">{qty}</span>
            <button className="qty-btn" onClick={() => setQty((q) => q + 1)}>
              +
            </button>
          </div>
        </div>

        <div className="field">
          <div className="field-label">Enhed (valgfri)</div>
          <input
            className="text-input"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            placeholder="Fx. kg, liter, pose..."
          />
        </div>

        <div className="panel-actions">
          {!isNew && (
            <button className="btn-danger" onClick={() => onDelete(item.id)}>
              Slet
            </button>
          )}
          <button className="btn-secondary" onClick={onClose}>
            Annuller
          </button>
          <button className="btn-primary" onClick={handleSave}>
            {isNew ? "Tilføj" : "Opdater"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ListPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [panel, setPanel] = useState(null);
  const [checked, setChecked] = useState(new Set());

  async function loadItems() {
    setLoading(true);
    try {
      const res = await fetch(URL, { headers });
      const data = await res.json();
      setItems(data || []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (cancelled) return;
      try {
        setLoading(true);
        const res = await fetch(URL, { headers });
        const data = await res.json();
        if (!cancelled) setItems(data || []);
      } catch {
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSave(vals) {
    if (panel.id) {
      await fetch(`${URL}?id=eq.${panel.id}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify(vals),
      });
    } else {
      await fetch(URL, {
        method: "POST",
        headers,
        body: JSON.stringify(vals),
      });
    }
    setPanel(null);
    await loadItems();
  }

  async function handleDelete(id) {
    await fetch(`${URL}?id=eq.${id}`, { method: "DELETE", headers });
    setPanel(null);
    setChecked((prev) => {
      const s = new Set(prev);
      s.delete(id);
      return s;
    });
    await loadItems();
  }

  function toggleCheck(id) {
    setChecked((prev) => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  }

  const unchecked = items.filter((i) => !checked.has(i.id));
  const checkedItems = items.filter((i) => checked.has(i.id));
  const sorted = [...unchecked, ...checkedItems];

  return (
    <>
      <div className="page">
        <header className="header">
          <h1>Indkøb</h1>
          <div className="category-bar">
            <span>Fælles</span>
            <ChevronDown />
          </div>
        </header>

        <div className="items-section">
          {loading ? (
            <div className="loading">
              <div className="dot-spin" />
              <p>Henter liste…</p>
            </div>
          ) : items.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">🛒</div>
              <p>
                Ingen varer endnu.
                <br />
                Tryk på knappen nedenfor.
              </p>
            </div>
          ) : (
            sorted.map((item) => (
              <div
                key={item.id}
                className={`item-row${checked.has(item.id) ? " checked" : ""}`}
                onClick={() => setPanel(item)}
              >
                <div
                  className={`checkbox${checked.has(item.id) ? " checked" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCheck(item.id);
                  }}
                >
                  <CheckIcon />
                </div>
                <div className="item-info">
                  <div className="item-name">{item.title}</div>
                  {(item.qty > 1 || item.unit) && (
                    <div className="item-qty">
                      {item.qty}
                      {item.unit ? ` ${item.unit}` : ""}
                    </div>
                  )}
                </div>
                <div className="item-chevron">
                  <ChevronRight />
                </div>
              </div>
            ))
          )}
        </div>

        <div className="add-btn-bar">
          <button
            className="add-btn"
            onClick={() => setPanel({ title: "", qty: 1, unit: "" })}
          >
            Tilføj til liste
          </button>
        </div>
      </div>

      {panel && (
        <ItemPanel
          item={panel}
          onClose={() => setPanel(null)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}
