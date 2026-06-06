import {createBrowserRouter, RouterProvider} from "react-router-dom";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import BookingPage from "./pages/BookingPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import RootLayout from "./layouts/RootLayout";
import { eventLoader } from "./loaders/eventLoader";



const router = createBrowserRouter([
  { path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <EventsPage /> },
      { path: 'events/:id', element: <EventDetailPage />, loader: eventLoader },
      { path: 'booking/:id', element: <BookingPage /> },
      { path: 'bookings', element: <MyBookingsPage /> }
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;


