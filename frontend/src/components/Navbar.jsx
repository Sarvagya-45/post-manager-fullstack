import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>PostManager</div>

      <button onClick={handleLogout} style={styles.button}>
        Logout
      </button>
    </nav>
  );
}

const styles = {
  nav: {
    height: "65px",
    background: "#111",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 30px",
    boxSizing: "border-box",
  },

  logo: {
    fontSize: "20px",
    fontWeight: "700",
  },

  button: {
    background: "#fff",
    color: "#111",
    border: "none",
    padding: "9px 16px",
    borderRadius: "7px",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default Navbar;
