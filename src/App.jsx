import { Routes, Route } from "react-router-dom";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import BookingPage from "./pages/BookingPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetailPage />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path="/bookings" element={<MyBookingsPage />} />
      </Routes>
    </>
  );
}

export default App;
