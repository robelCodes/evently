const BookingCard = ({ booking, onCancel, isUpcoming }) => (
  <div className="booking-item">

    <div className="booking-item-info">
      <h3>{booking.eventTitle}</h3>
      <div className="booking-item-meta">
        <span>📅 {booking.eventDate}</span>
        <span>🎟 {booking.booking_tickets?.reduce((sum, t) => sum + t.quantity, 0) || 0} ticket(s)</span>
        <span>🔖 {booking.referenceNumber}</span>
        <span className={`badge ${
          booking.status === 'confirmed' ? 'badge-success' :
          booking.status === 'cancelled' ? 'badge-error' : 'badge-outline'
        }`}>
          {booking.status}
        </span>
      </div>
    </div>

    <div className="booking-item-right">
      <div className="booking-item-price">${booking.totalAmount}</div>
      {booking.status === 'confirmed' && isUpcoming && (
        <button
          className="btn btn-outline btn-sm"
          style={{ color: 'var(--error)', borderColor: 'var(--error)' }}
          onClick={() => onCancel(booking.id)}
        >
          Cancel
        </button>
      )}
    </div>

  </div>
)

export default BookingCard