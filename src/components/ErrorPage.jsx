import { useRouteError, useNavigate } from "react-router-dom"

function ErrorPage() {
  const error = useRouteError()
  const navigate = useNavigate()

  return (
    <div className="empty-state" style={{ minHeight: "100vh", justifyContent: "center" }}>
      <div className="empty-state-icon">⚠️</div>
      <h3>{error?.status === 404 ? "Page Not Found" : "Something went wrong, sorry this is my first react web dev."}</h3>
      <p>{error?.message || "An unexpected error occurred"}</p>
      <button className="btn btn-primary" onClick={() => navigate("/")}>
        Go Home
      </button>
    </div>
  )
}

export default ErrorPage