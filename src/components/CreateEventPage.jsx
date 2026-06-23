import { useSelector } from "react-redux"
import BookingProgress from "../components/BookingProgress"
import CreateEventStep1 from "../components/CreateEventStep1"
import CreateEventStep2 from "../components/CreateEventStep2"
import CreateEventStep3 from "../components/CreateEventStep3"

function CreateEventPage() {
  const step = useSelector((state) => state.createEvent.step)

  return (
    <div className="booking-page">
      <BookingProgress currentStep={step} />
      {step === 1 && <CreateEventStep1 />}
      {step === 2 && <CreateEventStep2 />}
      {step === 3 && <CreateEventStep3 />}
    </div>
  )
}

export default CreateEventPage