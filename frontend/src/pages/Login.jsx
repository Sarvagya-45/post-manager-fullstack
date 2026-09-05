import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "https://post-manager-fullstack-1.onrender.com";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, form);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } else {
        setError("Login failed. Token not received.");
      }
    } catch (error) {
      console.error("Login Error:", error);

      setError(
        error.response?.data?.message ||
          "Login failed. Please check your email and password.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome Back</h1>

        <p style={styles.subtitle}>Login to your account.</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
            }}
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={styles.bottomText}>
          Don't have an account?{" "}
          <Link to="/register" style={styles.link}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#fff",
    padding: "40px",
    borderRadius: "18px",
    boxShadow: "0 10px 35px rgba(0,0,0,0.08)",
  },

  title: {
    margin: "0 0 8px",
    fontSize: "30px",
    color: "#111",
  },

  subtitle: {
    color: "#666",
    marginBottom: "25px",
  },

  input: {
    width: "100%",
    padding: "13px",
    marginBottom: "14px",
    border: "1px solid #ddd",
    borderRadius: "9px",
    fontSize: "15px",
    boxSizing: "border-box",
    outline: "none",
  },

  button: {
    width: "100%",
    padding: "13px",
    border: "none",
    borderRadius: "9px",
    background: "#111",
    color: "#fff",
    fontSize: "15px",
    cursor: "pointer",
  },

  error: {
    background: "#ffeaea",
    color: "#c00",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "15px",
    fontSize: "14px",
  },

  bottomText: {
    textAlign: "center",
    marginTop: "22px",
    color: "#666",
  },

  link: {
    color: "#111",
    fontWeight: "bold",
    textDecoration: "none",
  },
};

export default Login;
