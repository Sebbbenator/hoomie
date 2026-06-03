import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../lib/supabaseClient";
import TopbarSmall from "../components/TopbarSmall";
import AuthButton from "../components/AuthButton";
import "../css_pages/ListPage.css";

import checkIcon from "../assets/icons/check.svg";
import rightArrowIcon from "../assets/icons/right-arrow.svg";

const CATEGORIES = [
  "alle",
  "fælles",
  "daniel",
  "martin",
  "Sebastian",
  "sommerfest",
];

const EMPTY_FORM = { name: "", category: "fælles", description: "" };

export default function ListPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("alle");
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const { data } = await supabase
      .from("list_items")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setItems(data);
  }

  function openCreate() {
    setEditItem(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  }

  function openEdit(item) {
    setEditItem(item);
    setForm({
      name: item.name,
      category: item.category,
      description: item.description ?? "",
    });
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditItem(null);
    setForm(EMPTY_FORM);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (editItem) {
      await supabase.from("list_items").update(form).eq("id", editItem.id);
    } else {
      await supabase.from("list_items").insert([{ ...form, bought: false }]);
    }
    await fetchItems();
    closeModal();
  }

  async function handleDelete() {
    await supabase.from("list_items").delete().eq("id", editItem.id);
    await fetchItems();
    closeModal();
  }

  async function toggleBought(id, current) {
    await supabase.from("list_items").update({ bought: !current }).eq("id", id);
    await fetchItems();
  }

  const filtered =
    activeCategory === "alle"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <>
      <header>
        <TopbarSmall
          color="var(--yellow)"
          title="Indkøb"
          notificationLabel="Åbn notifikationer"
          onNotificationClick={() => navigate("/notifications")}
        />
      </header>

      <main className="list-page">
        <div className="list-categories">
          {CATEGORIES.map((cat) => (
            <span
              key={cat}
              className={`list-chip${activeCategory === cat ? " list-chip--active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </span>
          ))}
        </div>

        <ul className="list-items">
          {filtered.map((item) => (
            <li key={item.id} className="list-item">
              <button
                type="button"
                className={`list-checkbox${item.bought ? " list-checkbox--checked" : ""}`}
                onClick={() => toggleBought(item.id, item.bought)}
                aria-label={
                  item.bought ? "Marker som ikke købt" : "Marker som købt"
                }
              >
                {item.bought && (
                  <img src={checkIcon} alt="" aria-hidden="true" />
                )}
              </button>
              <div className="list-item-info" onClick={() => openEdit(item)}>
                <p
                  className={`list-item-name${item.bought ? " list-item-name--bought" : ""}`}
                >
                  {item.name}
                </p>
                {item.description && (
                  <span className="list-item-desc">{item.description}</span>
                )}
              </div>
              <img
                className="list-item-chevron"
                src={rightArrowIcon}
                alt=""
                aria-hidden="true"
                onClick={() => openEdit(item)}
              />
            </li>
          ))}
          {filtered.length === 0 && (
            <p className="list-empty">Ingen varer her endnu.</p>
          )}
        </ul>

        <div className="list-add-btn">
          <AuthButton
            variant="secondary"
            secondaryColor="var(--yellow)"
            onClick={openCreate}
          >
            + Tilføj til liste
          </AuthButton>
        </div>
      </main>

      {showModal && (
        <div className="list-modal-overlay" onClick={closeModal}>
          <div className="list-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="list-modal-title">Tilføj til liste</h2>

            <form onSubmit={handleSubmit}>
              <label className="list-label">Produkt</label>
              <input
                className="list-input"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Hvad skal købes?"
                required
              />

              <label className="list-label">Liste</label>
              <div className="list-modal-chips">
                {CATEGORIES.filter((c) => c !== "alle").map((cat) => (
                  <span
                    key={cat}
                    className={`list-chip${form.category === cat ? " list-chip--active" : ""}`}
                    onClick={() => setForm({ ...form, category: cat })}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </span>
                ))}
              </div>

              <label className="list-label">Beskrivelse</label>
              <input
                className="list-input"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Mængde, butik, osv."
              />

              {editItem ? (
                <div className="list-modal-buttons">
                  <AuthButton
                    variant="danger"
                    className="list-delete-btn"
                    onClick={handleDelete}
                  >
                    Slet
                  </AuthButton>
                  <AuthButton
                    type="submit"
                    variant="secondary"
                    secondaryColor="var(--yellow)"
                    className="list-submit-btn"
                  >
                    Opdater
                  </AuthButton>
                </div>
              ) : (
                <AuthButton
                  type="submit"
                  variant="secondary"
                  secondaryColor="var(--yellow)"
                  className="list-submit-btn"
                >
                  Tilføj
                </AuthButton>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
