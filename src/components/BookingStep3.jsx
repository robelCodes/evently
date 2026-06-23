import { useNavigate } from "react-router-dom";
//import { useState } from 'react'
import { buildBooking, saveBooking } from "../services/bookingService";
import { useMutation } from "@tanstack/react-query";

const BookingStep3 = ({ state, dispatch, event }) => {
  const navigate = useNavigate();
  

  const { mutate, isPending, isSuccess, error, data } = useMutation({
  mutationFn: (bookingData) => saveBooking(bookingData),
  });

  const handleConfirm = () => {
    const booking = buildBooking(state, event);
    mutate(booking);
  };
  
  // so here i kinda have created a swapable semi-component, one is the before confirming to show summary of what is about to be booked.
  // The other is the booking confirmation
  // and then we can forward it to the summary component below which displays the summary

  if (isSuccess) {
    return (
      <div className="booking-card">
        <div className="confirmation">
          <div className="confirmation-icon">✓</div>
          <h2>Booking Confirmed!</h2>
          <p style={{ color: "var(--text-secondary)" }}>
            Your tickets have been booked successfully.
          </p>
          <div className="confirmation-ref">{data?.reference_number}</div>
        </div>

        <BookingSummary state={state} event={event} />

        <button
          className="btn btn-primary"
          style={{ width: "100%", justifyContent: "center" }}
          onClick={() => navigate("/bookings")}
        >
          View My Bookings
        </button>
      </div>
    );
  }

  return (
    <div className="booking-card">
      <h2>Confirm Booking</h2>

      <BookingSummary state={state} event={event} />

      {error && (
        <p style={{ color: "var(--error)", marginBottom: 12 }}>
          {error.message}
        </p>
      )}

      <div style={{ display: "flex", gap: 12 }}>
        <button
          className="btn btn-outline"
          style={{ flex: 1, justifyContent: "center" }}
          onClick={() => dispatch({ type: "PREV_STEP" })}
        >
          ← Back
        </button>
        <button
          className="btn btn-primary"
          style={{ flex: 1, justifyContent: "center" }}
          disabled={isPending}
          onClick={handleConfirm}
        >
          {isPending ? "Processing..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
};

const BookingSummary = ({ state, event }) => (
  <div className="price-summary" style={{ marginBottom: 24 }}>
    <div className="price-row">
      <span>Event</span>
      <span>{event.title}</span>
    </div>
    <div className="price-row">
      <span>Date</span>
      <span>
        {event.date} · {event.time}
      </span>
    </div>
    <div className="price-row">
      <span>Ticket</span>
      <span>
        {state.selectedTicket.name} x {state.quantity}
      </span>
    </div>
    <div className="price-row">
      <span>Attendee</span>
      <span>{state.attendeesInfo?.[0]?.name || "N/A"}</span>
    </div>
    <div className="price-row">
      <span>Email</span>
      <span>{state.attendeesInfo?.[0]?.email || "N/A"}</span>
    </div>
    <div className="price-row total">
      <span>Total</span>
      <span>${state.totalAmount || 0}</span>
    </div>
  </div>
);

export default BookingStep3;
