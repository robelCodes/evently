import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import FilterBar from "../components/FilterBar";
import EventsGrid from "../components/EventsGrid";
import StatsBar from "../components/StatsBar";
import { supabase } from "../lib/supabase";

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");

  const [activeFilter, setActiveFilter] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // useEffect(() => {
  //   fetch("http://localhost:3001/events")
  //     .then((res) => {
  //       if (!res.ok) throw new Error("Failed to fetch events");
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setEvents(data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setError(err.message);
  //       setLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    const loadEvents = async () => {
      const { data, error } = await supabase.from("events").select(`
        *,
        ticket_types(*)
      `);

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      const formatted = data.map((event) => ({
        ...event,
        date: event.event_date,
        time: event.event_time,
        organizerName: event.organizer_name,
        ticketTypes: event.ticket_types,
      }));

      setEvents(formatted);
      setLoading(false);
    };

    loadEvents();
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

    const lowestPrice = Math.min(
      ...(event.ticketTypes?.map((t) => t.price) || [0]),
    );

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

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(a.date) - new Date(b.date);
    }

    if (sortBy === "price-asc" || sortBy === "price-desc") {
      const priceA = Math.min(...(a.ticketTypes?.map((t) => t.price) || [0]));
      const priceB = Math.min(...(b.ticketTypes?.map((t) => t.price) || [0]));
      return sortBy === "price-asc" ? priceA - priceB : priceB - priceA;
    }

    return 0;
  });

  return (
    <>
      <Hero onSearch={setSearchTerm} />
      <FilterBar
        activeCategory={activeCategory}
        activeFilter={activeFilter}
        onCategoryClick={(catId) => {
          setActiveCategory(catId);
          setActiveFilter("");
          setSearchTerm(catId === "all" ? "" : catId);
        }}
        onFilterClick={(filterId) => {
          setActiveFilter(filterId);
          setActiveCategory("all");
          setSearchTerm(filterId);
        }}
        onSort={setSortBy}
      />
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
        <EventsGrid events={sortedEvents} />
      </div>
      <StatsBar />
    </>
  );
}

export default EventsPage;
