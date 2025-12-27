import { useState } from "react";
import "../../styles/Register.css";
import ImageSlider from "../../components/ImageSlider";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [resetOtpSent, setResetOtpSent] = useState(false);

  const [errors, setErrors] = useState({});

  /* ================= LOGIN SEND OTP ================= */
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!email || !password) {
      setErrors({ backend: "Email and password required" });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        setOtpSent(true);
        alert("OTP sent to your email");
      } else {
        setErrors({ backend: result.message });
      }
    } catch {
      setErrors({ backend: "Backend not reachable" });
    }
  };

  /* ================= VERIFY LOGIN OTP ================= */
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const response = await fetch("http://localhost:5000/api/users/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Login successful");
        if (result.role === "admin") window.location.href = "/admin-dashboard";
        else window.location.href = "/UserDashboard";
      } else {
        setErrors({ backend: result.message });
      }
    } catch {
      setErrors({ backend: "Backend not reachable" });
    }
  };

  /* ================= FORGOT PASSWORD SEND OTP ================= */
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!email) {
      setErrors({ backend: "Email required" });
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setResetOtpSent(true);
        alert("Reset OTP sent to email");
      } else {
        setErrors({ backend: result.message });
      }
    } catch {
      setErrors({ backend: "Backend not reachable" });
    }
  };

  /* ================= RESET PASSWORD ================= */
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!otp || !newPassword) {
      setErrors({ backend: "OTP and new password required" });
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp, newPassword }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Password reset successful");
        setForgotMode(false);
        setResetOtpSent(false);
        setOtp("");
        setNewPassword("");
      } else {
        setErrors({ backend: result.message });
      }
    } catch {
      setErrors({ backend: "Backend not reachable" });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="col-md-7 p-0">
          <ImageSlider />
        </div>

        <div className="col-md-5 d-flex justify-content-center align-items-center">
          <div className="card register-card p-4 shadow">
            <h3 className="text-center mb-4">
              {forgotMode ? "Reset Password" : "Login"}
            </h3>

            {/* ========== LOGIN FORM ========== */}
            {!forgotMode && !otpSent && (
              <form onSubmit={handleLogin}>
                <input
                  className="form-control mb-3"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  className="form-control mb-3"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {errors.backend && (
                  <small className="text-danger">{errors.backend}</small>
                )}

                <button className="btn btn-primary w-100 mt-3">
                  Send OTP
                </button>

                <p className="text-end mt-2">
                  <button
                    type="button"
                    className="btn btn-link p-0"
                    onClick={() => setForgotMode(true)}
                  >
                    Forgot Password?
                  </button>
                </p>
              </form>
            )}

            {/* ========== VERIFY LOGIN OTP ========== */}
            {!forgotMode && otpSent && (
              <form onSubmit={handleVerifyOtp}>
                <input
                  className="form-control mb-3"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />

                {errors.backend && (
                  <small className="text-danger">{errors.backend}</small>
                )}

                <button className="btn btn-primary w-100 mt-3">
                  Verify OTP
                </button>
              </form>
            )}

            {/* ========== FORGOT PASSWORD SEND OTP ========== */}
            {forgotMode && !resetOtpSent && (
              <form onSubmit={handleForgotPassword}>
                <input
                  className="form-control mb-3"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {errors.backend && (
                  <small className="text-danger">{errors.backend}</small>
                )}

                <button className="btn btn-primary w-100">
                  Send Reset OTP
                </button>
              </form>
            )}

            {/* ========== RESET PASSWORD ========== */}
            {forgotMode && resetOtpSent && (
              <form onSubmit={handleResetPassword}>
                <input
                  className="form-control mb-3"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />

                <input
                  className="form-control mb-3"
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                {errors.backend && (
                  <small className="text-danger">{errors.backend}</small>
                )}

                <button className="btn btn-success w-100">
                  Reset Password
                </button>
              </form>
            )}

            {!forgotMode && (
              <p className="text-center mt-3">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
