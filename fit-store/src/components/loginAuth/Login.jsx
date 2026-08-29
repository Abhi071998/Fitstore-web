import react, { useEffect, useRef, useState } from "react";
import { useLoginMutation } from "../../store/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, logout } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Toast from "../common/components/Toast";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const revealTimeoutRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    return () => clearTimeout(revealTimeoutRef.current);
  }, []);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(true);
    clearTimeout(revealTimeoutRef.current);
    revealTimeoutRef.current = setTimeout(() => setShowPassword(false), 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login({ email, password }).unwrap();
      dispatch(setCredentials({ user: result.user, token: result.token }));
      setShowToast(true);
      setTimeout(() => navigate("/"), 1200);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = () => {
    dispatch(logout()); // Clears store and localStorage
  };

  if (isAuthenticated) {
    return (
      <>
        {showToast && (
          <Toast message="Login successful!" onClose={() => setShowToast(false)} />
        )}
        <div className="login-page">
          <div className="login-glass-card login-welcome-card">
            <h2>Welcome, {user?.name || user?.email || "User"}!</h2>
            <p>You are currently logged in.</p>
            <button className="login-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {showToast && (
        <Toast message="Login successful!" onClose={() => setShowToast(false)} />
      )}
      <div className="login-page">
        <form className="login-glass-card" onSubmit={handleSubmit}>
          <h2 className="login-title">FITstore Admin Login</h2>

          {error && (
            <p className="login-error">
              {error?.data?.message || "Login failed"}
            </p>
          )}

          <div className="login-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="login-field">
            <label>Password</label>
            <div className="login-password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="login-password-toggle"
                onClick={handleTogglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button className="login-btn" type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}