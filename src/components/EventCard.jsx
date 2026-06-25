import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

const toggleLike = async ({ eventId, liked }) => {
  const { data, error } = await supabase.rpc("increment_likes", {
    event_id: eventId,
    amount: liked ? 1 : -1,
  });
  if (error) throw new Error(error.message);
  return data;
};

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const [isFavourite, setIsFavourite] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("favourites") || "[]");
    return saved.includes(event.id);
  });
  const queryClient = useQueryClient();

  

  const { mutate: toggleFavourite } = useMutation({
    mutationFn: toggleLike,

    onMutate: async ({ eventId, liked }) => {
      await queryClient.cancelQueries({ queryKey: ["events"] });
      const previousEvents = queryClient.getQueryData(["events"]);

      
      const saved = JSON.parse(localStorage.getItem("favourites") || "[]");
      const updated = liked
        ? [...saved, eventId]
        : saved.filter((id) => id !== eventId);
      localStorage.setItem("favourites", JSON.stringify(updated));

      
      queryClient.setQueryData(["events"], (old) =>
        old?.map((e) =>
          e.id === eventId
            ? { ...e, likes: (e.likes || 0) + (liked ? 1 : -1) }
            : e,
        ),
      );

      setIsFavourite(liked);
      return { previousEvents };
    },

    
    onError: (err, { eventId, liked }, context) => {
      queryClient.setQueryData(["events"], context.previousEvents);
      const saved = JSON.parse(localStorage.getItem("favourites") || "[]");
      const reverted = !liked
        ? [...saved, eventId]
        : saved.filter((id) => id !== eventId);
      localStorage.setItem("favourites", JSON.stringify(reverted));
      setIsFavourite(!liked);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
  

  const handleCardClick = () => {
    navigate(`/events/${event.id}`);
  };

  const handleFavourite = (e) => {
    e.stopPropagation();
    toggleFavourite({ eventId: event.id, liked: !isFavourite });
  };

  return (
    <div className="event-card" onClick={handleCardClick}>
      <div className="event-card-image">
        <img src={event.image} alt={event.title} />
        <span className="event-card-category">{event.category}</span>
        <button className="favourite-btn" onClick={handleFavourite}>
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
