import { useAuth } from "../context/AuthContext"
import { useTheme } from "../context/ThemeContext"

function ProfilePage() {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="container section">
      <h1 style={{ marginBottom: 4 }}>My Profile</h1>
      <p style={{ color: "var(--text-secondary)", marginBottom: 32 }}>
        Your account details and preferences
      </p>

      <div className="booking-card" style={{ maxWidth: 600 }}>
        <div className="price-summary" style={{ marginBottom: 24 }}>
          <div className="price-row">
            <span>Name</span>
            <span>{user.name}</span>
          </div>
          <div className="price-row">
            <span>Email</span>
            <span>{user.email}</span>
          </div>
          <div className="price-row">
            <span>User ID</span>
            <span style={{ color: "var(--text-muted)", fontSize: 13 }}>{user.id}</span>
          </div>
        </div>

        <div className="divider" style={{ marginBottom: 24 }} />

        <h3 style={{ marginBottom: 16 }}>Preferences</h3>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Theme</span>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage