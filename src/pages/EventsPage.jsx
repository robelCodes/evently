import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import FilterBar from "../components/FilterBar";
import EventsGrid from "../components/EventsGrid";


function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredEvents = events.filter((event) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDate = new Date(event.date);

    if (searchTerm === "upcoming") return eventDate >= today;
    if (searchTerm === "this-week") {
      const weekFromNow = new Date();
      weekFromNow.setDate(today.getDate() + 7);
      return eventDate >= today && eventDate <= weekFromNow;
    }

    if (searchTerm === "this-month") {
      return (
        eventDate.getMonth() === today.getMonth() &&
        eventDate.getFullYear() === today.getFullYear()
      );
    }

    const lowestPrice = Math.min(...event.ticketTypes.map((t) => t.price));

    if (searchTerm === "free") return lowestPrice === 0;
    if (searchTerm === "under-50") return lowestPrice > 0 && lowestPrice < 50;
    if (searchTerm === "over-50") return lowestPrice >= 50;

    return (
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (loading)
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading events...</p>
      </div>
    );

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
    );
  }

  return (
    <>
      <Hero onSearch={setSearchTerm} />
      <FilterBar onClick={setSearchTerm} />
      <div className="container section">
        <div className="section-header">
          <div>
            <h2>All Events</h2>
            {searchTerm && (
              <p>
                Showing {filteredEvents.length} results for "{searchTerm}"
              </p>
            )}
            {!searchTerm && <p>Discover what's happening around you</p>}
          </div>
        </div>
        <EventsGrid events={filteredEvents} />
      </div>
      
    </>
  );
}

export default EventsPage;
