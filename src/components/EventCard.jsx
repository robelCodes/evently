import { useNavigate } from "react-router-dom";
import { useState } from "react";

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const [isFavourite, setIsFavourite] = useState(false);

  const handleCardClick = () => {
    navigate(`/events/${event.id}`);
  };

  return (
    <div className="event-card" onClick={handleCardClick}>
      <div className="event-card-image">
        <img src={event.image} alt={event.title} />
        <span className="event-card-category">{event.category}</span>
        <button
          className="favourite-btn"
          onClick={(e) => {
            e.stopPropagation();
            setIsFavourite(!isFavourite);
          }}
        >
          {isFavourite ? "❤️" : "🤍"}
        </button>
        
      </div>

      

      <div className="event-card-body">
        <h3 className="event-card-title">{event.title}</h3>

        <div className="event-card-meta">
          <div className="event-card-meta-item">
            📅 {event.date} · {event.time}
          </div>
          <div className="event-card-meta-item">📍 {event.location}</div>
          <div className="event-card-meta-item">
            👥 {event.attending} attending
          </div>
        </div>

        <div className="event-card-footer">
          <div>
            <div className="event-card-price-label">From</div>
            <div className="event-card-price-value">
              ${event.ticketTypes[0].price}
            </div>
          </div>
          <button className="btn btn-primary btn-sm">Get Tickets</button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
