import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    console.log("Registration Data:", formData);
    alert("Registration will be handled with backend");
  };

  return (
    <div className="register-page">
      <div className="back-home">
        <Link to="/">← Back to Home</Link>
      </div>

      <div className="register-container">
        <div className="logo">
          <h1>Join Our Library</h1>
          <p>Create your member account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone number"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create password"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                required
              />
            </div>
          </div>

          <div className="terms">
            By creating an account, you agree to our terms of service and
            privacy policy. Monthly membership fees apply as per library policy.
          </div>

          <button type="submit" className="btn">
            Create Account
          </button>
        </form>

        <div className="form-footer">
          <div className="divider">Already have an account?</div>
          <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
