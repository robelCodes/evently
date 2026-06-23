import { useNavigate } from "react-router-dom";
import { fetchBookings, cancelBooking } from "../services/bookingService";
import BookingCard from "../components/BookingCard";
import Modal from "../components/Modal";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function MyBookingsPage() {
  const navigate = useNavigate();
  const [cancelId, setCancelId] = useState(null);
  const [activeTab, setActiveTab] = useState("upcoming");
  const queryClient = useQueryClient();

  const {
    data: bookings = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: fetchBookings,
    staleTime: 60000,
  });

  const { mutate: confirmCancel } = useMutation({
    mutationFn: (id) => cancelBooking(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["bookings"] });

      const previousBookings = queryClient.getQueryData(["bookings"]);

      queryClient.setQueryData(["bookings"], (old) =>
        old.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b)),
      );
      return { previousBookings };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["bookings"], context.previousBookings);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      setCancelId(null);
    },
  });

  const handleCancel = () => confirmCancel(cancelId)




  const isUpcoming = (booking) => new Date(booking.eventDate) >= new Date();

  const filtered = bookings.filter((booking) =>
    activeTab === "upcoming" ? isUpcoming(booking) : !isUpcoming(booking),
  );

  

  if (isLoading)
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p>Loading your bookings...</p>
      </div>
    );

  if (error)
    return (
      <div className="empty-state">
        <div className="empty-state-icon">⚠️</div>
        <h3>Something went wrong</h3>
        <p>{error.message}</p>
        <button
          className="btn btn-primary"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );

  return (
    <div className="bookings-page">
      <div className="container">
        <h1>My Bookings</h1>
        <p style={{ color: "var(--text-secondary)", marginBottom: 24 }}>
          {bookings.length} total booking{bookings.length !== 1 ? "s" : ""}
        </p>

        <div className="bookings-tabs">
          <button
            className={`bookings-tab ${activeTab === "upcoming" ? "active" : ""}`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming
          </button>
          <button
            className={`bookings-tab ${activeTab === "past" ? "active" : ""}`}
            onClick={() => setActiveTab("past")}
          >
            Past
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🎟</div>
            <h3>No {activeTab} bookings</h3>
            <p>
              {activeTab === "upcoming"
                ? "You don't have any upcoming events booked."
                : "You haven't attended any past events yet."}
            </p>
            {activeTab === "upcoming" && (
              <button className="btn btn-primary" onClick={() => navigate("/")}>
                Browse Events
              </button>
            )}
          </div>
        ) : (
          filtered.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              isUpcoming={isUpcoming(booking)}
              onCancel={setCancelId}
            />
          ))
        )}
      </div>

      {cancelId && (
        <Modal
          title="Cancel Booking"
          message="Are you sure you want to cancel this booking? This cannot be undone."
          onConfirm={handleCancel}
          onCancel={() => setCancelId(null)}
        />
      )}
    </div>
  );
}

export default MyBookingsPage;
