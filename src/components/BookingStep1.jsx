



const BookingStep1 = ({ state, dispatch, event }) => {
  return (
    <div className="booking-card">
      <h2> Select Tickets</h2>

      <div
        style={{
          marginBottom: 20,
          padding: 16,
          background: "var(--surface-2)",
          borderRadius: "var(--radius)",
        }}
      >
        <h3>{event.title} </h3>
        <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
          📅 {event.date} · {event.time}
        </p>
      </div>

      <p style={{ fontWeight: 600, marginBottom: 10 }}>Ticket Type</p>
      {(event.ticketTypes || []).map((ticket) => (
        <div
          key={ticket.id}
          className={`ticket-type ${state.selectedTicket?.id === ticket.id ? "selected" : ""}`}
          onClick={() => dispatch({ type: "SET_TICKET", payload: ticket })}
        >
          <div>
            <div className="ticket-type-name">{ticket.name}</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
              {ticket.available} available
            </div>
          </div>
          <div className="ticket-type-price">
            {ticket.price === 0 ? "Free" : `$${ticket.price}`}
          </div>
        </div>
      ))}

      <p style={{ fontWeight: 600, margin: "20px 0 10px" }}>Quantity</p>
      <div className="quantity-selector">
        <button
          className="qty-btn"
          onClick={() =>
            dispatch({
              type: "SET_QUANTITY",
              payload: Math.max(1, state.quantity - 1),
            })
          }
        >
          −
        </button>
        <span className="qty-value">{state.quantity}</span>
        <button
          className="qty-btn"
          onClick={() =>
            dispatch({
              type: "SET_QUANTITY",
              payload: Math.min(10, state.quantity + 1),
            })
          }
        >
          +
        </button>
      </div>

      <div className="price-summary" style={{ marginTop: 20 }}>
        <div className="price-row">
          <span>
            {state.selectedTicket?.name || "No ticket selected"}
          </span>
          <span>
            ${state.selectedTicket?.price || 0} x {state.quantity}
          </span>
        </div>
        <div className="price-row total">
          <span>Total</span>
          <span>
            ${(state.selectedTicket?.price || 0) * state.quantity}
          </span>
        </div>
      </div>
      

      <button
        className="btn btn-primary"
        style={{ width: "100%", marginTop: 20, justifyContent: "center" }}
        disabled={!state.selectedTicket}
        onClick={() => dispatch({ type: "NEXT_STEP" })}
      >
        Continue →
      </button>
    </div>
  );
};

export default BookingStep1;
