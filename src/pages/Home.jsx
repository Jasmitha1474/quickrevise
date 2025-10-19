import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Home() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      const { data, error } = await supabase.from("flashcards").select("subject");
      console.log("Fetched subjects:", data, "Error:", error);

      if (error) {
        console.error("Error fetching subjects:", error);
        return;
      }

      const unique = [...new Set(data.map((item) => item.subject))];
      setSubjects(unique);
    };

    fetchSubjects();
  }, []);

  // pastel notebook colors cycling
  const colors = ["rose", "lavender", "aqua", "mint", "butter", "peach"];

  // ➕ Add new subject
  const handleAddSubject = async () => {
    const name = prompt("Enter new subject name:");
    if (!name || name.trim() === "") return;

    try {
      const { error } = await supabase.from("flashcards").insert([
        { subject: name.trim(), question: "", answer: "", difficulty: "Easy" },
      ]);
      if (error) throw error;
      alert(`✅ Subject "${name}" added!`);
      setSubjects((prev) => [...prev, name.trim()]);
    } catch (err) {
      console.error("Error adding subject:", err);
      alert("⚠️ Failed to add subject. Check Supabase connection.");
    }
  };

  return (
    <div className="wrap">
      <h1 className="brand">QUICK REVISE</h1>

      <div className="grid">
        {subjects.length === 0 ? (
          <p className="muted">
            No subjects yet. Import CSV to Supabase or add from a subject page.
          </p>
        ) : (
          subjects.map((subj, i) => (
            <button
              key={subj}
              className={`note note-${colors[i % colors.length]}`}
              onClick={() => navigate(`/s/${encodeURIComponent(subj)}`)}
              aria-label={`Open ${subj} flashcards`}
            >
              <div className="note-spiral">
                {Array.from({ length: 12 }).map((_, k) => (
                  <span key={k} />
                ))}
              </div>
              <div className="note-title">{subj}</div>
            </button>
          ))
        )}

        {/* ➕ Add New Subject (looks like another note) */}
        <button
          className="note note-new"
          onClick={handleAddSubject}
          aria-label="Add new subject"
        >
          <div className="note-spiral">
            {Array.from({ length: 12 }).map((_, k) => (
              <span key={k} />
            ))}
          </div>
          <div className="note-title">+ New Subject</div>
        </button>
      </div>
    </div>
  );
}
