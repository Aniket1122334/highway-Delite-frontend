import React, { useEffect, useState } from "react";
import styles from "./NoteScreen.module.css";
import axios from "../../../utils/axiosInstance"; // Axios instance

interface User {
  name: string;
  email: string;
}

const NoteScreen: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError(" Please login first");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loader}></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={styles.container}
        style={{
          color: "red",
          fontSize: "20px",
          fontWeight: 600,
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          textAlign: "center",
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Welcome, {user?.name}!</h2>
        <p>Email: {user?.email}</p>
      </div>
    </div>
  );
};

export default NoteScreen;
