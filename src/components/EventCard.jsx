

const EventCard = ({ event }) => {



    return (<div className="event-card">

     
      <div className="event-card-image">
        <img src={event.image} alt={event.title} />
        <span className="event-card-category">{event.category}</span>
        <span className="event-card-rating">⭐ {event.rating}</span>
      </div>

      
      <div className="event-card-body">
        <h3 className="event-card-title">{event.title}</h3>

        <div className="event-card-meta">
          <div className="event-card-meta-item">
            📅 {event.date} · {event.time}
          </div>
          <div className="event-card-meta-item">
            📍 {event.location}
          </div>
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
          <button className="btn btn-primary btn-sm">
            Get Tickets
          </button>
        </div>

      </div>
    </div>

    )
}

export default EventCard