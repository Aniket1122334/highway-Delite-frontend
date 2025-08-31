import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./ShowForm.module.css";

const ShowForm: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // note id
  const navigate = useNavigate();

  const [heading, setHeading] = useState("");
  const [noteMessage, setNoteMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not authenticated. Please login first.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:3000/api/notes/shownote/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setHeading(res.data.note.heading);
        setNoteMessage(res.data.note.noteMessage);
      } catch (err: any) {
        console.error("Error fetching note:", err);
        setError(err.response?.data?.message || "Failed to load note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not authenticated. Please login first.");
      return;
    }

    try {
      await axios.delete(
        `http://localhost:3000/api/notes/deletenote/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Note deleted successfully");
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Error deleting note:", err);
      alert(err.response?.data?.message || "Failed to delete note");
    }
  };

  // ✅ Authentication check UI
  if (!localStorage.getItem("token")) {
    return (
      <div className={styles.unauthContainer}>
        <p>User not authenticated. Please login first.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {loading ? (
        <p>Loading note...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <form className={styles.formBox}>
          <h2 className={styles.title}>View Note</h2>

          <input
            type="text"
            value={heading}
            readOnly
            className={styles.inputBox}
          />

          <textarea
            value={noteMessage}
            readOnly
            rows={6}
            className={styles.textArea}
          />

          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={styles.deleteBtn}
              onClick={handleDelete}
            >
              Delete Note
            </button>

            <button
              type="button"
              className={styles.dashboardBtn}
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ShowForm;
