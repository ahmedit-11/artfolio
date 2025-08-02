/* eslint-disable react/react-in-jsx-scope */
import { useCallback, useEffect, useState } from "react";
import SocialIcons from "./socialIcons";
import "../../../public/styles/authForm.css";

export default function AuthForm() {
  const [isActive, setIsActive] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    login: false,
    register: false,
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const toggleForms = (isRegister) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsActive(isRegister);
    setTimeout(() => setIsAnimating(false), 1800); // Matches CSS animation
  };

  useEffect(() => {
    const selector = isActive ? ".register input" : ".login input";
    document.querySelector(selector)?.focus();
  }, [isActive]);

  const PasswordInput = useCallback(
    ({ id, value, showPassword, toggleVisibility }) => (
      <div className="input-box">
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          placeholder="Password"
          required
          value={value}
          onChange={handleInputChange}
        />
        <button
          type="button"
          className="password-toggle"
          onClick={toggleVisibility}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          <i className={`bx ${showPassword ? "bxs-show" : "bxs-hide"}`} />
        </button>
      </div>
    ),
    []
  );

  return (
    <div className={`container ${isActive ? "active" : ""}`}>
      {/* Login Form */}
      <div className="form-box login">
        <form>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
            <i className="bx bxs-envelope" />
          </div>

          <PasswordInput
            id="password"
            value={formData.password}
            showPassword={showPasswords.login}
            toggleVisibility={() =>
              setShowPasswords((prev) => ({
                ...prev,
                login: !prev.login,
              }))
            }
          />

          <div className="forgot-link">
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit" className="btn">
            Login
          </button>
          <p>or login with social platforms</p>
          <SocialIcons />
        </form>
      </div>

      {/* Registration Form */}
      <div className="form-box register">
        <form>
          <h1>Registration</h1>

          <div className="input-box">
            <input
              type="text"
              id="name"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={handleInputChange}
            />
            <i className="bx bxs-user" />
          </div>

          <div className="input-box">
            <input
              type="text"
              id="username"
              placeholder="Username"
              required
              value={formData.username}
              onChange={handleInputChange}
            />
            <i className="bx bxs-user" />
          </div>

          <div className="input-box">
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
            <i className="bx bxs-envelope" />
          </div>

          <PasswordInput
            id="password"
            value={formData.password}
            showPassword={showPasswords.register}
            toggleVisibility={() =>
              setShowPasswords((prev) => ({
                ...prev,
                register: !prev.register,
              }))
            }
          />

          <button type="submit" className="btn">
            Register
          </button>
          <p>or register with social platforms</p>
          <SocialIcons />
        </form>
      </div>

      {/* Toggle Panel */}
      <div className="toggle-box">
        <div className="toggle-panel register">
          <center>
            <h1>
              Start your journey <span>here.</span>
            </h1>
            <p>Don&apos;t have an account?</p>
          </center>
          <button
            className="btn register-btn"
            onClick={() => toggleForms(true)}
            disabled={isAnimating}
          >
            Register
          </button>
        </div>

        <div className="toggle-panel login">
          <center>
            <h1>
              Great to see you <span>again!</span>
            </h1>
            <p>Log in below.</p>
          </center>
          <button
            className="btn login-btn"
            onClick={() => toggleForms(false)}
            disabled={isAnimating}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
