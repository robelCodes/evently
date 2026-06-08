import { useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { bookingReducer, initialState } from "../reducers/bookingReducer";

import BookingProgress from "../components/BookingProgress";
import BookingStep1 from "../components/BookingStep1";
import BookingStep2 from "../components/BookingStep2";
import BookingStep3 from "../components/BookingStep3";



function BookingPage() {

  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state?.event;
  const [bookingState, dispatch] = useReducer(bookingReducer, initialState);

  if (!event) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">⚠️</div>
        <h3>No event data found</h3>
        <p>Please select an event first</p>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Browse Events
        </button>
      </div>
    );
  }

return (
  <div className="booking-page">
    <BookingProgress currentStep={bookingState.step} />
    {bookingState.step === 1 && <BookingStep1 state={bookingState} dispatch={dispatch} event={event} />}
    {bookingState.step === 2 && <BookingStep2 state={bookingState} dispatch={dispatch} />}
    {bookingState.step === 3 && <BookingStep3 state={bookingState} event={event} dispatch={dispatch} />}
  </div>

)


  
}

export default BookingPage;
