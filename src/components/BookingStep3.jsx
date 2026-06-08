import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const BookingStep3 = ({ state, dispatch, event }) => {
  const navigate    = useNavigate()
  const [loading, setLoading]   = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [refNumber, setRefNumber] = useState('')

  const handleConfirm = () => {
    setLoading(true)

    
    const ref = 'BK' + Math.random().toString(36).substring(2, 8).toUpperCase()

    const booking = {
      userId:          'user1',
      eventId:         event.id,
      eventTitle:      event.title,
      eventDate:       event.date,
      eventImage:      event.image,
      tickets: [{
        type:     state.selectedTicket.name,
        quantity: state.quantity,
        price:    state.selectedTicket.price,
      }],
      attendees:       state.attendeesInfo,
      totalAmount:     state.totalAmount,
      status:          'confirmed',
      bookingDate:     new Date().toISOString().split('T')[0],
      referenceNumber: ref,
    }

    fetch('http://localhost:3001/bookings', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(booking),
    })
      .then(res => {
        if (!res.ok) throw new Error('Booking failed')
        setRefNumber(ref)
        setSubmitted(true)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  // so here i kinda have created a swapable semi-component, one is the before confirming to show summary of what is about to be booked.
  // The other is the booking confirmation


  if (submitted) {
    return (
      <div className="booking-card">
        <div className="confirmation">
          <div className="confirmation-icon">✓</div>
          <h2>Booking Confirmed!</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Your ticketss have been booked successfully.
          </p>
          <div className="confirmation-ref">{refNumber}</div>
        </div>

        
        <div className="price-summary" style={{ marginBottom: 24 }}>
          <div className="price-row">
            <span>Event</span>
            <span>{event.title}</span>
          </div>
          <div className="price-row">
            <span>Date</span>
            <span>{event.date} · {event.time}</span>
          </div>
          <div className="price-row">
            <span>Ticket</span>
            <span>{state.selectedTicket.name} × {state.quantity}</span>
          </div>
          <div className="price-row">
            <span>Attendee</span>
            <span>{state.attendeesInfo[0].name}</span>
          </div>
          <div className="price-row total">
            <span>Total Paid</span>
            <span>${state.totalAmount}</span>
          </div>
        </div>

        <button
          className="btn btn-primary"
          style={{ width: '100%', justifyContent: 'center' }}
          onClick={() => navigate('/bookings')}
        >
          View My Bookings
        </button>
      </div>
    )
  }

  
  return (
    <div className="booking-card">
      <h2>Confirm Booking</h2>

      {/* Order summary */}
      <div className="price-summary" style={{ marginBottom: 24 }}>
        <div className="price-row">
          <span>Event</span>
          <span>{event.title}</span>
        </div>
        <div className="price-row">
          <span>Date</span>
          <span>{event.date} · {event.time}</span>
        </div>
        <div className="price-row">
          <span>Ticket</span>
          <span>{state.selectedTicket.name} × {state.quantity}</span>
        </div>
        <div className="price-row">
          <span>Attendee</span>
          <span>{state.attendeesInfo[0].name}</span>
        </div>
        <div className="price-row">
          <span>Email</span>
          <span>{state.attendeesInfo[0].email}</span>
        </div>
        <div className="price-row total">
          <span>Total</span>
          <span>${state.totalAmount}</span>
        </div>
      </div>

      
      <div style={{ display: 'flex', gap: 12 }}>
        <button
          className="btn btn-outline"
          style={{ flex: 1, justifyContent: 'center' }}
          onClick={() => dispatch({ type: 'PREV_STEP' })}
        >
          ← Back
        </button>
        <button
          className="btn btn-primary"
          style={{ flex: 1, justifyContent: 'center' }}
          disabled={loading}
          onClick={handleConfirm}
        >
          {loading ? 'Processing...' : 'Confirm Booking'}
        </button>
      </div>
    </div>
  )
}

export default BookingStep3