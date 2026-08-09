import react, { useState } from "react";
import { useLoginMutation } from "../../store/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login({ email, password }).unwrap();
      dispatch(setCredentials({ user: result.user, token: result.token }));
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = () => {
    dispatch(logout()); // Clears store and localStorage
  };

  if (isAuthenticated) {
    return (
      <div className="login-page">
        <div className="login-glass-card login-welcome-card">
          <h2>Welcome, {user?.email || "User"}!</h2>
          <p>You are currently logged in.</p>
          <button className="login-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
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
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <button className="login-btn" type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}