import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import AddFlashcardModal from "../ui/AddFlashcardModal.jsx";

export default function FlashcardViewer() {
  const { subject } = useParams();
  const navigate = useNavigate();

  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  async function fetchCards() {
    const { data, error } = await supabase
      .from("flashcards")
      .select("*")
      .eq("subject", subject)
      .order("id", { ascending: true });
    if (error) console.error(error);
    setCards(data || []);
    setIndex(0);
    setFlipped(false);
  }

  useEffect(() => { fetchCards(); }, [subject]);

  const card = cards[index];

  return (
    <div className="viewer-wrap">
      <header className="viewer-header">
        <button className="link" onClick={() => navigate("/")}>← back</button>
        <h2 className="viewer-title">{subject}</h2>
        <div style={{ width: 64 }} />{/* spacer */}
      </header>

      {cards.length === 0 ? (
        <p className="muted" style={{ marginTop: 40 }}>No flashcards for this subject yet.</p>
      ) : (
        <>
          <div className="flip-zone" onClick={() => setFlipped(v => !v)}>
            <div className={`card ${flipped ? "is-flipped" : ""}`}>
              <div className="card-face card-front">
                <span className={`badge badge-${(card?.difficulty || "Easy").toLowerCase()}`}>
                  {card?.difficulty || "Easy"}
                </span>
                <p className="card-text">{card?.question}</p>
              </div>
              <div className="card-face card-back">
                <span className={`badge badge-${(card?.difficulty || "Easy").toLowerCase()}`}>
                  {card?.difficulty || "Easy"}
                </span>
                <p className="card-text">{card?.answer}</p>
              </div>
            </div>
          </div>

          <div className="nav-row">
            <button
              className="btn"
              onClick={() => { setFlipped(false); setIndex(i => Math.max(0, i - 1)); }}
              disabled={index === 0}
            >
              ◀ Prev
            </button>
            <div className="muted">Card {index + 1} / {cards.length}</div>
            <button
              className="btn"
              onClick={() => { setFlipped(false); setIndex(i => Math.min(cards.length - 1, i + 1)); }}
              disabled={index === cards.length - 1}
            >
              Next ▶
            </button>
          </div>
        </>
      )}

      {/* Floating “+ Flashcard” bubble */}
      <button className="fab" onClick={() => setShowAdd(true)}>+ Flashcard</button>

      {showAdd && (
        <AddFlashcardModal
          subject={subject}
          onClose={() => setShowAdd(false)}
          onAdded={() => { setShowAdd(false); fetchCards(); }}
        />
      )}
    </div>
  );
}
