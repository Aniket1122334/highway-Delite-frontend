import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./CreateForm.module.css";

const CreateForm: React.FC = () => {
  const [heading, setHeading] = useState("");
  const [noteMessage, setNoteMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [authenticated, setAuthenticated] = useState(true);

  const navigate = useNavigate();

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuthenticated(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("⚠️ User not authenticated. Please login first.");
        setLoading(false);
        return;
      }

      await axios.post(
        "http://localhost:3000/api/notes/createnote",
        { heading, noteMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess("✅ Note created successfully!");

      setTimeout(() => navigate("/dashboard"), 1000);

      setHeading("");
      setNoteMessage("");
    } catch (err: any) {
      console.error("Error creating note:", err);
      setError(err.response?.data?.message || "❌ Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          color: "red",
          fontSize: "20px",
          fontWeight: 600,
          backgroundColor: "white",
        }}
      >
        User not authenticated. Please login first.
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Create Note</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.section}>
          <label htmlFor="heading" className={styles.label}>
            Heading
          </label>
          <input
            type="text"
            id="heading"
            className={styles.input}
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            placeholder="Enter note heading"
            required
          />
        </div>

        <div className={styles.section}>
          <label htmlFor="noteMessage" className={styles.label}>
            Message
          </label>
          <textarea
            id="noteMessage"
            className={styles.textarea}
            value={noteMessage}
            onChange={(e) => setNoteMessage(e.target.value)}
            placeholder="Enter your note message"
            rows={6}
            required
          />
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Creating..." : "Create New Note"}
          </button>

          <button
            type="button"
            className={styles.button}
            style={{ background: "#4c51bf" }}
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </button>
        </div>

        {success && <p style={{ color: "green", marginTop: "10px" }}>{success}</p>}
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </form>
    </div>
  );
};

export default CreateForm;