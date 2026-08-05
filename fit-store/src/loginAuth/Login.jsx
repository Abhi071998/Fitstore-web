import react, { useState } from "react";
import { useLoginMutation } from "../store/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

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
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h2>Welcome, {user?.email || "User"}!</h2>
        <p>You are currently logged in.</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>FITstore Admin Login</h2>

      {error && (
        <p style={{ color: "red" }}>{error?.data?.message || "Login failed"}</p>
      )}

      <div>
        <label>Email: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}