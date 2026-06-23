import { useDispatch, useSelector } from "react-redux";
import { prevStep, publishEvent, resetForm } from "../store/createEventSlice";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

function CreateEventStep3() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const state = useSelector((state) => state.createEvent);

  const handlePublish = async () => {
    const result = await dispatch(publishEvent(state));

    if (publishEvent.fulfilled.match(result)) {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    }
  };

  const handleSuccessNavigate = () => {
    dispatch(resetForm());
    navigate("/");
  };

  if (state.status === "success") {
    return (
      <div className="booking-card">
        <div className="confirmation">
          <div className="confirmation-icon">✓</div>
          <h2>Event Published!</h2>
          <p style={{ color: "var(--text-secondary)" }}>
            Event is now live and visible to everyone.
          </p>
        </div>
        <button
          className="btn btn-primary"
          style={{ width: "100%", justifyContent: "center" }}
          onClick={handleSuccessNavigate}
        >
          View All Events
        </button>
      </div>
    );
  }

  return (
    <div className="booking-card">
      <h2>Preview & Publish</h2>

      {state.image && (
        <img
          src={state.image}
          alt={state.title}
          style={{
            width: "100%",
            height: 200,
            objectFit: "cover",
            borderRadius: "var(--radius)",
            marginBottom: 20,
          }}
        />
      )}

      <div className="price-summary" style={{ marginBottom: 24 }}>
        <div className="price-row">
          <span>Title</span>
          <span>{state.title}</span>
        </div>
        <div className="price-row">
          <span>Category</span>
          <span>{state.category}</span>
        </div>
        <div className="price-row">
          <span>Date</span>
          <span>
            {state.date} · {state.time}
          </span>
        </div>
        <div className="price-row">
          <span>Venue</span>
          <span>{state.venue}</span>
        </div>
        <div className="price-row">
          <span>Location</span>
          <span>{state.location}</span>
        </div>
        <div className="price-row">
          <span>Tickets</span>
          <span>{state.ticketTypes.length} type(s)</span>
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h4 style={{ marginBottom: 8 }}>Ticket Types</h4>
        {state.ticketTypes.map((t) => (
          <div key={t.id} className="ticket-type display-only">
            <div>
              <div className="ticket-type-name">{t.name || "Unnamed"}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                {t.available} available
              </div>
            </div>
            <div className="ticket-type-price">
              {Number(t.price) === 0 ? "Free" : `$${t.price}`}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 16 }}>
        <h4 style={{ marginBottom: 8 }}>Description</h4>
        <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>
          {state.description}
        </p>
      </div>

      {state.status === "error" && (
        <p style={{ color: "var(--error)", marginBottom: 12 }}>{state.error}</p>
      )}

      <div style={{ display: "flex", gap: 12 }}>
        <button
          className="btn btn-outline"
          style={{ flex: 1, justifyContent: "center" }}
          onClick={() => dispatch(prevStep())}
          disabled={state.status === "loading"}
        >
          ← Back
        </button>
        <button
          className="btn btn-primary"
          style={{ flex: 1, justifyContent: "center" }}
          onClick={handlePublish}
          disabled={state.status === "loading"}
        >
          {state.status === "loading" ? "Publishing..." : "Publish Event 🚀"}
        </button>
      </div>
    </div>
  );
}

export default CreateEventStep3;
