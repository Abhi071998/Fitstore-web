import react, { useState } from "react";
import { useLoginMutation } from "../store/apiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login,{isLoading,error}] = useLoginMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await login({email,password}).unwrap();
            dispatch(setCredentials({user: result.user, token: result.token}));
            alert("Login successful!");
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }
    return (
    <form onSubmit={handleSubmit}>
      <h2>FITstore Admin Login</h2>

      {error && <p style={{ color: 'red' }}>{error?.data?.message || 'Login failed'}</p>}

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
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}