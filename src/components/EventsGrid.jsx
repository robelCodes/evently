import { useState, useEffect } from "react";
import EventCard from "./EventCard";

const EventsGrid = ({ events }) => {
  

  

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