import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import Image from "../../assets/images/signup.jpg";
import logo from "../../assets/images/logo.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "../../utils/axiosInstance";

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [showOTPInput, setShowOTPInput] = useState(false);
  const [showOTPText, setShowOTPText] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    otp: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [notification, setNotification] = useState("");

  // 🆕 state to store OTP token from backend
  const [otpToken, setOtpToken] = useState<string>("");

  const toggleOTPText = () => setShowOTPText(!showOTPText);

  // 🔹 Send OTP
  const handleGetOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!formData.name || !formData.dob || !formData.email) {
      setMessage("Please fill all fields");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("/send-otp", {
        name: formData.name,
        dob: formData.dob,
        email: formData.email,
      });

      // 🆕 Save OTP token from backend
      setOtpToken(res.data.token);
      
      setShowOTPInput(true);
      setNotification("Please check your email for OTP");
      setTimeout(() => setNotification(""), 4000);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Verify OTP & Signup
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!formData.otp) {
      setMessage("Please enter OTP");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("/verify-signup", {
        otp: formData.otp,
        token: otpToken, // 🆕 Send token to backend for verification
      });

      // ✅ Save final JWT token in localStorage
      localStorage.setItem("token", res.data.token);

      // ✅ Success notification
      setNotification(`${res.data.user.name} logged in successfully`);
      setTimeout(() => setNotification(""), 4000);

      // ✅ Redirect to dashboard
      setMessage("Signup successful! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.mainbox}>
      {/* 🔹 Popup Notification */}
      {notification && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#4caf50",
            color: "white",
            padding: "10px 20px",
            borderRadius: "6px",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}
        >
          {notification}
        </div>
      )}

      <div className={styles.container}>
        <div className={styles.leftBox}>
          <div className={styles.upperbox}>
            <div className={styles.icon}>
              <img src={logo} alt="Logo" />
            </div>
          </div>

          <div className={styles.left}>
            <div className={styles.inner}>
              <div className={`${styles.heading} mb-4`}>
                <h2>Sign up</h2>
                <span>Sign up to enjoy the feature of HD</span>
              </div>

              <div className={styles.formDesign}>
                <form>
                  {/* Name */}
                  <div className={`${styles.relativeClass} mb-4`}>
                    <label htmlFor="name" className={`form-label ${styles.labelClass}`}>
                      <span>Your Name</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${styles.inputBorder}`}
                      id="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={showOTPInput}
                    />
                  </div>

                  {/* DOB */}
                  <div className={`${styles.relativeClass} mb-4`}>
                    <label htmlFor="dob" className={`form-label ${styles.labelClass}`}>
                      <span>Date of Birth</span>
                    </label>
                    <input
                      type="date"
                      className={`form-control ${styles.inputBorder}`}
                      id="dob"
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      disabled={showOTPInput}
                    />
                  </div>

                  {/* Email */}
                  <div className={`${styles.relativeClass} mb-4`}>
                    <label htmlFor="email" className={`form-label ${styles.labelClass}`}>
                      <span>Email</span>
                    </label>
                    <input
                      type="email"
                      className={`form-control ${styles.inputBorder}`}
                      id="email"
                      placeholder="Enter your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={showOTPInput}
                    />
                  </div>

                  {/* OTP */}
                  {showOTPInput && (
                    <div className={`${styles.relativeClass} mb-4 ${styles.otpWrapper}`}>
                      <div className={styles.otpInputWrapper}>
                        <input
                          type={showOTPText ? "text" : "password"}
                          className={`form-control ${styles.inputBorder}`}
                          id="otp"
                          placeholder="OTP"
                          value={formData.otp}
                          onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                        />
                        <span className={styles.eyeIcon} onClick={toggleOTPText}>
                          {showOTPText ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Button */}
                  <button
                    type="submit"
                    className={`btn btn-primary w-100 ${styles.buttonSize}`}
                    onClick={showOTPInput ? handleVerifyOTP : handleGetOTP}
                    disabled={loading}
                  >
                    {showOTPInput
                      ? loading
                        ? "Verifying..."
                        : "Sign Up"
                      : loading
                      ? "Sending OTP..."
                      : "Get OTP"}
                  </button>

                  {/* Message */}
                  {message && <p style={{ marginTop: "10px", color: "red" }}>{message}</p>}

                  {/* Already have an account */}
                  <div className={styles.signInLink}>
                    <span>Already have an account? </span>
                    <Link to="/signin" className={styles.link}>
                      Sign in
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Image */}
        <div className={styles.rightImage}>
          <div className={styles.right} style={{ backgroundImage: `url(${Image})` }} />
        </div>
      </div>
    </div>
  );
};

export default Signup;
