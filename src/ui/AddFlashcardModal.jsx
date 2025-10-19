import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function AddFlashcardModal({ subject, onClose, onAdded }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [busy, setBusy] = useState(false);

  async function handleAdd(e) {
    e.preventDefault();
    if (!question || !answer) return;
    setBusy(true);
    const { error } = await supabase.from("flashcards").insert([
      { subject, question, answer, difficulty }
    ]);
    setBusy(false);
    if (error) {
      console.error(error);
      alert("Could not add flashcard.");
    } else {
      onAdded?.();
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">Add Flashcard — {subject}</h3>
        <form className="form" onSubmit={handleAdd}>
          <label className="lbl">Question
            <input className="inp" value={question} onChange={(e) => setQuestion(e.target.value)} />
          </label>
          <label className="lbl">Answer
            <textarea className="inp" rows={4} value={answer} onChange={(e) => setAnswer(e.target.value)} />
          </label>
          <label className="lbl">Difficulty
            <select className="inp" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option>Easy</option><option>Medium</option><option>Hard</option>
            </select>
          </label>

          <div className="modal-actions">
            <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn" disabled={busy}>{busy ? "Adding…" : "Add"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
