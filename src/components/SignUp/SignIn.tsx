import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignIn.module.css";
import Image from "../../assets/images/signup.jpg";
import logo from "../../assets/images/logo.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "../../utils/axiosInstance";

const SignIn: React.FC = () => {
  const navigate = useNavigate();

  // States
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [showOTPText, setShowOTPText] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });
  const [otpToken, setOtpToken] = useState(""); // JWT from /signin
  const [keepMeLoggedIn, setKeepMeLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [notification, setNotification] = useState("");

  // Toggle OTP visibility
  const toggleOTPText = () => setShowOTPText(!showOTPText);

  // Send OTP
  const handleGetOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!formData.email) {
      setMessage("Please enter your email");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("/signin", { email: formData.email });
      setOtpToken(res.data.token); // Store OTP token
      setShowOTPInput(true);
      setNotification("OTP sent to your email!");
      setTimeout(() => setNotification(""), 4000);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!formData.otp) {
      setMessage("Please enter OTP");
      setLoading(false);
      return;
    }

    if (!otpToken) {
      setMessage("OTP token missing. Please request OTP again.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("/verify-signin", {
        email: formData.email,
        otp: formData.otp,
        token: otpToken, // Send token for verification
        keepLoggedIn: keepMeLoggedIn, // Keep logged in option
      });

      // Save JWT from backend
      localStorage.setItem("token", res.data.token);

      setNotification(`${res.data.user.name} logged in successfully!`);
      setTimeout(() => setNotification(""), 4000);

      setMessage("Sign in successful! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    if (!formData.email) {
      setMessage("Please enter your email to resend OTP");
      return;
    }
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("/resend-otp", { email: formData.email });
      setOtpToken(res.data.token); // Update OTP token
      setNotification("OTP resent! Check your email.");
      setTimeout(() => setNotification(""), 4000);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Error resending OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.mainbox}>
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
        {/* Left Box */}
        <div className={styles.leftBox}>
          <div className={styles.upperbox}>
            <div className={styles.icon}>
              <img src={logo} alt="Logo" />
            </div>
          </div>

          <div className={styles.left}>
            <div className={styles.inner}>
              <div className={`${styles.heading} mb-4`}>
                <h2>Sign In</h2>
                <span>Login to continue</span>
              </div>

              <form className={styles.formDesign}>
                {/* Email */}
                <div className={`${styles.relativeClass} mb-4`}>
                  <label htmlFor="email" className={`form-label ${styles.labelClass}`}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`form-control ${styles.inputBorder}`}
                    placeholder="Enter your email"
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
                        id="otp"
                        className={`form-control ${styles.inputBorder}`}
                        placeholder="Enter OTP"
                        value={formData.otp}
                        onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                      />
                      <span className={styles.eyeIcon} onClick={toggleOTPText}>
                        {showOTPText ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
                      </span>
                    </div>

                    {/* Resend OTP */}
                    <div className={styles.resendOTP}>
                      <button type="button" onClick={handleResendOTP} disabled={loading}>
                        Resend OTP
                      </button>
                    </div>

                    {/* Keep me logged in */}
                    <div className={styles.keepMeLogin}>
                      <input
                        type="checkbox"
                        id="keepMeLogin"
                        checked={keepMeLoggedIn}
                        onChange={(e) => setKeepMeLoggedIn(e.target.checked)}
                      />
                      <label htmlFor="keepMeLogin">Keep me logged in</label>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className={`btn btn-primary w-100 ${styles.buttonSize}`}
                  onClick={showOTPInput ? handleVerifyOTP : handleGetOTP}
                  disabled={loading}
                >
                  {showOTPInput
                    ? loading
                      ? "Verifying..."
                      : "Sign In"
                    : loading
                    ? "Sending OTP..."
                    : "Get OTP"}
                </button>

                {message && <p style={{ marginTop: "10px", color: "red" }}>{message}</p>}

                <div className={styles.signInLink}>
                  <span>Need an account? </span>
                  <Link to="/" className={styles.link}>
                    Sign Up
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className={styles.rightImage}>
          <div className={styles.right} style={{ backgroundImage: `url(${Image})` }} />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
