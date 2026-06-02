import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../lib/supabaseClient";
import TopbarSmall from "../components/TopbarSmall";
import AuthButton from "../components/AuthButton";
import "../css_pages/TaskPage.css";

import othersIcon from "../assets/icons/others.svg";
import kitchenIcon from "../assets/icons/kitchen.svg";
import bathIcon from "../assets/icons/bath.svg";
import rightArrowIcon from "../assets/icons/right-arrow.svg";
import livingRoomIcon from "../assets/icons/living-room.svg";
import outsideIcon from "../assets/icons/outside.svg";
import pointIcon from "../assets/icons/point.svg";

const CATEGORIES = ["alle", "køkken", "bad", "stue", "udendørs", "andet"];

const CATEGORY_COLORS = {
  andet: "var(--green)",
  køkken: "var(--yellow)",
  bad: "var(--blue)",
  stue: "var(--orange)",
  udendørs: "var(--violet)",
};

const CATEGORY_ICONS = {
  andet: othersIcon,
  køkken: kitchenIcon,
  bad: bathIcon,
  stue: livingRoomIcon,
  udendørs: outsideIcon,
};

const EMPTY_FORM = {
  title: "",
  category: "andet",
  points: 1,
  description: "",
};

export default function TaskPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [activeCategory, setActiveCategory] = useState("alle");
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    const { data } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setTasks(data);
  }

  function openCreate() {
    setEditTask(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  }

  function openEdit(task) {
    setEditTask(task);
    setForm({
      title: task.title,
      category: task.category,
      points: task.points,
      description: task.description ?? "",
    });
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditTask(null);
    setForm(EMPTY_FORM);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (editTask) {
      await supabase.from("tasks").update(form).eq("id", editTask.id);
    } else {
      await supabase.from("tasks").insert([form]);
    }
    await fetchTasks();
    closeModal();
  }

  async function handleDelete() {
    await supabase.from("tasks").delete().eq("id", editTask.id);
    await fetchTasks();
    closeModal();
  }

  const filtered =
    activeCategory === "alle"
      ? tasks
      : tasks.filter((t) => t.category === activeCategory);

  return (
    <>
      <header>
        <TopbarSmall
          color="var(--green)"
          title="Opgaver"
          notificationLabel="Åbn notifikationer"
          onNotificationClick={() => navigate("/notifications")}
        />
      </header>

      <main className="task-page">
        <div className="task-categories">
          {CATEGORIES.map((cat) => (
            <span
              key={cat}
              className={`task-chip${activeCategory === cat ? " task-chip--active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </span>
          ))}
        </div>

        <ul className="task-list">
          {filtered.map((task) => (
            <li key={task.id} className="task-item" onClick={() => openEdit(task)}>
              <div
                className="task-item-icon"
                style={{ backgroundColor: CATEGORY_COLORS[task.category] ?? "var(--green)" }}
              >
                <img
                  src={CATEGORY_ICONS[task.category] ?? othersIcon}
                  alt={task.category}
                />
              </div>
              <div className="task-item-info">
                <p className="task-item-title">{task.title}</p>
                <span className="task-item-points">
                  <img src={pointIcon} alt="point" />
                  {task.points} point
                </span>
              </div>
              <img className="task-item-chevron" src={rightArrowIcon} alt="" />
            </li>
          ))}
          {filtered.length === 0 && (
            <p className="task-empty">Ingen opgaver her endnu.</p>
          )}
        </ul>

        <div className="task-add-btn">
          <AuthButton variant="success" onClick={openCreate}>
            + Tilføj opgave
          </AuthButton>
        </div>
      </main>

      {showModal && (
        <div className="task-modal-overlay" onClick={closeModal}>
          <div className="task-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="task-modal-title">
              {editTask ? "Rediger opgave" : "Ny opgave"}
            </h2>

            <form onSubmit={handleSubmit}>
              <label className="task-label">Titel</label>
              <input
                className="task-input"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Hvad skal gøres?"
                required
              />

              <label className="task-label">Kategori</label>
              <div className="task-modal-chips">
                {CATEGORIES.filter((c) => c !== "alle").map((cat) => (
                  <span
                    key={cat}
                    className={`task-chip${form.category === cat ? " task-chip--active" : ""}`}
                    onClick={() => setForm({ ...form, category: cat })}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </span>
                ))}
              </div>
                {/* ai hjalp med at lave point selektor */}
              <label className="task-label">Point (1–10)</label>
              <div className="task-points-selector">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <span
                    key={n}
                    className={`task-point-block${form.points >= n ? " task-point-block--active" : ""}`}
                    onClick={() => setForm({ ...form, points: n })}
                  >
                    {n}
                  </span>
                ))}
              </div>

              <label className="task-label">Beskrivelse</label>
              <textarea
                className="task-input task-textarea"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Valgfri beskrivelse..."
                rows={4}
              />

              <AuthButton type="submit" variant="success" className="task-submit-btn">
                {editTask ? "Opdater" : "Opret"}
              </AuthButton>

              {editTask && (
                <AuthButton
                  variant="danger"
                  className="task-delete-btn"
                  onClick={handleDelete}
                >
                  Slet opgave
                </AuthButton>
              )}

              <button type="button" className="task-cancel-btn" onClick={closeModal}>
                Annuller
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
