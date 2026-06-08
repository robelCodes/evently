import { useLoaderData, useNavigate } from "react-router-dom";



function EventDetailPage() {
  const event = useLoaderData();
  const navigate = useNavigate();

  return (
    <div className="events-detail">
      <div className="container">
        <button
          className="btn btn-ghost"
          style={{ marginBottom: 16 }}
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <img
          src={event.image}
          alt={event.title}
          className="event-detail-hero"
        />

        <div className="event-detail-layout">
          <div>
            <span className="badge badge-primary" style={{ marginBottom: 12 }}>
              {event.category}
            </span>

            <h1 className="event-detail-title">{event.title}</h1>

            <div className="event-detail-meta">
              <div className="event-detail-meta-item">
                📅 {event.date} · {event.time}
              </div>
              <div className="event-detail-meta-item">
                📍 {event.venue}, {event.location}
              </div>
              <div className="event-detail-meta-item">
                👥 {event.attending?.toLocaleString()} attending
              </div>
              <div className="event-detail-meta-item">
                ⭐ {event.rating} rating
              </div>
              <div className="event-detail-meta-item">
                🎤 {event.organizerName}
              </div>
            </div>

            <div className="divider" style={{ margin: "24px 0" }} />
            <h3 style={{ marginBottom: 12 }}>About this event</h3>
            <p className="event-detail-description">{event.description}</p>
          </div>

          <div className="booking-sidebar">
            <h3 style={{ marginBottom: 16 }}>Available Tickets</h3>

            {event.ticketTypes.map(ticket => (
              <div key={ticket.id} className="ticket-type display-only">
                <div>
                  <div className="ticket-type-name">{ticket.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    {ticket.available} available
                  </div>
                </div>
                <div className="ticket-type-price">
                  {ticket.price === 0 ? 'Free' : `$${ticket.price}`}
                </div>
              </div>
            ))}

            <button
              className="btn btn-primary"
              style={{ width: "100%", marginTop: 20, justifyContent: "center" }}
              onClick={() =>
                navigate(`/booking/${event.id}`, {
                  state: { event },
                })
              }
            >
              Book Tickets
            </button>

            <p
              style={{
                fontSize: 12,
                color: "var(--text-muted)",
                textAlign: "center",
                marginTop: 12,
              }}
            >
              No booking fees · Instant confirmation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetailPage;
