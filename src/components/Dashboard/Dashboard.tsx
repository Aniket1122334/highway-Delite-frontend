import React from "react";
import Navbar from "./Navbar/Navbar";
import NoteScreen from "./NoteScreen/NoteScreen";
import NoteCreate from "./NoteCreate/NoteCreate";

import styles from "./Dashboard.module.css";

const Dashboard: React.FC = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <div className={styles.unauthContainer}>
        <p>User not authenticated. Please login first.</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <NoteScreen />
      <NoteCreate />
    </>
  );
};

export default Dashboard;