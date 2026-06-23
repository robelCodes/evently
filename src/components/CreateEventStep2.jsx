import { useDispatch, useSelector } from "react-redux";
import { updateField, nextStep, prevStep, addTicketType, removeTicketType, updateTicketType, } from "../store/createEventSlice";
import FormInput from "./FormInput";
import { useState } from "react";

function CreateEventStep2() {
  const dispatch = useDispatch();
  const { date, time, venue, location, ticketTypes } = useSelector(
    (state) => state.createEvent,
  );
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!date) newErrors.date = "Date is required";
    if (!time) newErrors.time = "Time is required";
    if (!venue.trim()) newErrors.venue = "Venue is required";
    if (!location.trim()) newErrors.location = "Location is required";
    ticketTypes.forEach((t, i) => {
      if (!t.name.trim())
        newErrors[`ticket-${i}-name`] = "Ticket name required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="booking-card">
      <h2>Date, Location & Tickets</h2>

      <FormInput
        label="Date"
        type="date"
        value={date}
        onChange={(e) =>
          dispatch(updateField({ field: "date", value: e.target.value }))
        }
        error={errors.date}
        required
      />

      <FormInput
        label="Time"
        type="time"
        value={time}
        onChange={(e) =>
          dispatch(updateField({ field: "time", value: e.target.value }))
        }
        error={errors.time}
        required
      />

      <FormInput
        label="Venue"
        value={venue}
        onChange={(e) =>
          dispatch(updateField({ field: "venue", value: e.target.value }))
        }
        error={errors.venue}
        placeholder="Rogers Centre"
        required
      />

      <FormInput
        label="City / Location"
        value={location}
        onChange={(e) =>
          dispatch(updateField({ field: "location", value: e.target.value }))
        }
        error={errors.location}
        placeholder="Toronto, ON"
        required
      />

      <div style={{ margin: "24px 0 12px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <h3 style={{ margin: 0 }}>Ticket Types</h3>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => dispatch(addTicketType())}
          >
            + Add Ticket
          </button>
        </div>

        {ticketTypes.map((ticket, i) => (
          <div
            key={ticket.id}
            style={{
              padding: 16,
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              marginBottom: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <strong style={{ fontSize: 14 }}>Ticket {i + 1}</strong>
              {ticketTypes.length > 1 && (
                <button
                  className="btn btn-ghost btn-sm"
                  style={{ color: "var(--error)", padding: "2px 8px" }}
                  onClick={() => dispatch(removeTicketType(ticket.id))}
                >
                  Remove
                </button>
              )}
            </div>

            <FormInput
              label="Ticket Name"
              value={ticket.name}
              onChange={(e) =>
                dispatch(
                  updateTicketType({
                    id: ticket.id,
                    field: "name",
                    value: e.target.value,
                  }),
                )
              }
              error={errors[`ticket-${i}-name`]}
              placeholder="General / VIP"
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              <FormInput
                label="Price ($)"
                type="number"
                value={ticket.price}
                onChange={(e) =>
                  dispatch(
                    updateTicketType({
                      id: ticket.id,
                      field: "price",
                      value: e.target.value,
                    }),
                  )
                }
                placeholder="0"
              />
              <FormInput
                label="Available"
                type="number"
                value={ticket.available}
                onChange={(e) =>
                  dispatch(
                    updateTicketType({
                      id: ticket.id,
                      field: "available",
                      value: e.target.value,
                    }),
                  )
                }
                placeholder="100"
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <button
          className="btn btn-outline"
          style={{ flex: 1, justifyContent: "center" }}
          onClick={() => dispatch(prevStep())}
        >
          ← Back
        </button>
        <button
          className="btn btn-primary"
          style={{ flex: 1, justifyContent: "center" }}
          onClick={() => {
            if (validate()) dispatch(nextStep());
          }}
        >
          Preview →
        </button>
      </div>
    </div>
  );
}

export default CreateEventStep2;
