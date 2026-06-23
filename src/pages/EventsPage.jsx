import { useState, useDeferredValue} from "react";
import Hero from "../components/Hero";
import FilterBar from "../components/FilterBar";
import EventsGrid from "../components/EventsGrid";
import StatsBar from "../components/StatsBar";
import { useEvents } from "../hooks/useEvents";


function EventsPage() {
  

  const {data: events=[], isLoading, isError, error}= useEvents()

  const [searchTerm, setSearchTerm] = useState("");
  const deferredSearch = useDeferredValue(searchTerm)
  const [sortBy, setSortBy] = useState("date");

  const [activeFilter, setActiveFilter] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");


  const filteredEvents = events.filter((event) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDate = new Date(event.date);

    if (deferredSearch === "upcoming") return eventDate >= today;
    if (deferredSearch === "this-week") {
      const weekFromNow = new Date();
      weekFromNow.setDate(today.getDate() + 7);
      return eventDate >= today && eventDate <= weekFromNow;
    }

    if (deferredSearch === "this-month") {
      return (
        eventDate.getMonth() === today.getMonth() &&
        eventDate.getFullYear() === today.getFullYear()
      );
    }

    const lowestPrice = Math.min(
      ...(event.ticketTypes?.map((t) => t.price) || [0]),
    );

    if (deferredSearch === "free") return lowestPrice === 0;
    if (deferredSearch === "under-50") return lowestPrice > 0 && lowestPrice < 50;
    if (deferredSearch === "over-50") return lowestPrice >= 50;

    return (
      event.title.toLowerCase().includes(deferredSearch.toLowerCase()) ||
      event.category.toLowerCase().includes(deferredSearch.toLowerCase())
    );
  });

  if (isLoading)
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
        <p>{error.message}</p>
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
            {deferredSearch && (
              <p>
                Showing {filteredEvents.length} results for "{deferredSearch}"
              </p>
            )}
            {!deferredSearch && <p>Discover what's happening around you</p>}
          </div>
        </div>
        <EventsGrid events={sortedEvents} />
      </div>
      <StatsBar />
    </>
  );
}

export default EventsPage;
