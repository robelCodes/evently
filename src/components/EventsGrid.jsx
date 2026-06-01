import { useState, useEffect } from "react";
import EventCard from "./EventCard";

const EventsGrid = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/events")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch events");
        return res.json();
      })
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);


  if (loading) return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading events...</p>
      </div>
    )
  


  if (error) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">⚠️</div>
        <h3>Something went wrong</h3>
        <p>{error}</p>
        <button
          className="btn btn-primary"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🎭</div>
        <h3>No events found</h3>
        <p>Try adjusting your search or filters</p>
      </div>
    )
  }


  return (
    <div className="events-grid">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}


export default EventsGrid