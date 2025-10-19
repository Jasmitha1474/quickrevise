import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Home() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
  const fetchSubjects = async () => {
    const { data, error } = await supabase
      .from("flashcards")
      .select("subject");
    console.log("Fetched subjects:", data, "Error:", error); // 👈 ADD THIS

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

  return (
    <div className="wrap">
      <h1 className="brand">QUICK REVISE</h1>

      <div className="grid">
        {subjects.length === 0 ? (
          <p className="muted">No subjects yet. Import CSV to Supabase or add from a subject page.</p>
        ) : (
          subjects.map((subj, i) => (
            <button
              key={subj}
              className={`note note-${colors[i % colors.length]}`}
              onClick={() => navigate(`/s/${encodeURIComponent(subj)}`)}
              aria-label={`Open ${subj} flashcards`}
            >
              <div className="note-spiral">
                {Array.from({ length: 12 }).map((_, k) => <span key={k} />)}
              </div>
              <div className="note-title">{subj}</div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
