import React from "react";
import logo from "../../../assets/images/logo2.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  // 🔹 Handle signout
  const handleSignOut = async () => {
    const confirmLogout = window.confirm("You can always come back in at any time.");
    if (!confirmLogout) return; // ❌ cancel → kuch nahi hoga

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated.");
        return;
      }

      // 🔹 Backend call
      await axios.post(
        "http://localhost:3000/api/signout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // 🔹 LocalStorage clear
      localStorage.removeItem("token");

      // 🔹 Redirect
      navigate("/signin");
    } catch (err: any) {
      console.error("Signout Error:", err);
      alert(err.response?.data?.message || "Failed to sign out");
    }
  };

  return (
    <nav className={styles.navbar}>
      {/* Left: Logo */}
      <div className={styles.logo}>
        <img src={logo} alt="Logo" />
      </div>

      {/* Center: Dashboard */}
      <div className={styles.title}>
        <span>Dashboard</span>
      </div>

      {/* Right: Sign Out */}
      <div className={styles.signOut} onClick={handleSignOut} style={{ cursor: "pointer" }}>
        <span>Sign Out</span>
      </div>
    </nav>
  );
};

export default Navbar;
