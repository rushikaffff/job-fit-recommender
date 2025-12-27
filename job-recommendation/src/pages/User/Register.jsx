import React, { useState } from "react";
import "../../styles/Register.css";
import ImageSlider from "../../components/ImageSlider";
import { Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Errors state
  const [errors, setErrors] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous errors
    setErrors({});

    // Frontend validation
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) newErrors.email = "Invalid email address";
    }
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      }); 

      const result = await response.json();

      if (response.ok) {
        setName("");
        setEmail("");
        setPassword("");
        setErrors({});
       window.location.href = "/UserDashboard";
      } else {
        // show backend error
        setErrors({ backend: result.message });
      }
    } catch (error) {
      setErrors({ backend: "Backend not reachable" });
      console.error(error);
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
            <h3 className="text-center mb-4">Create Account</h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  className="form-control"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && (
              <small className="text-danger">{errors.name}</small>
                )}
              </div>

              <div className="mb-3">
                <input
                  className="form-control"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <small className="text-danger">{errors.email}</small>
                )}
              </div>

              <div className="mb-3">
                <input
                  className="form-control"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <small className="text-danger">{errors.password}</small>
                )}
              </div>

              {errors.backend && (
                <div className="mb-3">
                  <small className="text-danger">{errors.backend}</small>
                </div>
              )}

              <button type="submit" className="btn btn-primary w-100 mb-3">
                Register
              </button>
            </form>

            <p className="text-center">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
