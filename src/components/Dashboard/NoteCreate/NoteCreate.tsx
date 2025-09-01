import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./NoteCreate.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";

interface Note {
  _id: string;
  heading: string;
  noteMessage: string;
}

const NoteCreate: React.FC = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleCreateNote = () => {
    navigate("/dashboard/createnote");
  };

  // 🔹 Navigate to Show Note page
  const handleNoteClick = (id: string) => {
    navigate(`/dashboard/shownote/${id}`);
  };

  // 🔹 Delete Note handler
  const handleDeleteNote = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // 👈 important: note click event trigger na ho
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated. Please login first.");
        return;
      }

      await axios.delete(`https://highway-delite-backend-7irg.onrender.com/api/notes/deletenote/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // 🔹 Delete hone ke baad UI se bhi note hata do
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));

      alert("Note deleted successfully");
    } catch (err: any) {
      console.error("Error deleting note:", err);
      alert(err.response?.data?.message || "Failed to delete note");
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User not authenticated. Please login first.");
          setLoading(false);
          return;
        }

        const res = await axios.get("http://localhost:3000/api/notes/shownote", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setNotes(res.data.notes || []);
      } catch (err: any) {
        console.error("Error fetching notes:", err);
        setError(err.response?.data?.message || "Failed to fetch notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.createButtonWrapper}>
        <button className={styles.createButton} onClick={handleCreateNote}>
          Create Note
        </button>
      </div>

      <div className={styles.notesSection}>
        <h3 className={styles.notesHeading}>Notes</h3>

        {loading ? (
          <p>Loading notes...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : notes.length === 0 ? (
          <p>No notes created yet.</p>
        ) : (
          notes.map((note) => (
            <div
              key={note._id}
              className={styles.noteStrip}
              onClick={() => handleNoteClick(note._id)} // 👈 click se redirect
              style={{ cursor: "pointer" }}
            >
              <span className={styles.noteTitle}>{note.heading}</span>
              <RiDeleteBin6Line
                className={styles.deleteIcon}
                onClick={(e) => handleDeleteNote(note._id, e)} // 👈 delete icon click
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NoteCreate;
