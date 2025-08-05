import { Link, useNavigate } from "react-router-dom";

const Header = ({ userRole = "Librarian", userName = "Sarah Johnson" }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Handle logout logic here
    navigate("/login");
  };

  return (
    <header
      style={{
        background: "#fff",
        borderBottom: "2px solid #e9ecef",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        position: "sticky",
        top: "0",
        zIndex: "50",
      }}
    >
      <div
        style={{
          maxWidth: "1140px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "1rem",
          paddingRight: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "1rem",
            paddingBottom: "1rem",
          }}
        >
          <Link
            to="/"
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              color: "#333",
              textDecoration: "none",
            }}
          >
            Library Management System
          </Link>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <span
              style={{
                background: "#333",
                color: "#fff",
                padding: "0.25rem 0.75rem",
                borderRadius: "15px",
                fontSize: "0.75rem",
                fontWeight: "500",
                textTransform: "uppercase",
              }}
            >
              {userRole}
            </span>
            <span
              style={{
                color: "#666",
              }}
            >
              {userName}
            </span>
            <Link
              to="/profile"
              style={{
                padding: "0.5rem 1rem",
                border: "2px solid #333",
                background: "transparent",
                color: "#333",
                fontWeight: "500",
                borderRadius: "5px",
                transition: "all 0.3s ease",
                cursor: "pointer",
                fontSize: "0.9rem",
                textDecoration: "none",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "#333";
                e.target.style.color = "#fff";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#333";
              }}
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              style={{
                padding: "0.5rem 1rem",
                border: "2px solid #333",
                background: "transparent",
                color: "#333",
                fontWeight: "500",
                borderRadius: "5px",
                transition: "all 0.3s ease",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "#333";
                e.target.style.color = "#fff";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#333";
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
