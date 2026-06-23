import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import BookingPage from "./pages/BookingPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import RootLayout from "./layouts/RootLayout";
import { eventLoader } from "./loaders/eventLoader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CreateEventPage from "./components/CreateEventPage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <EventsPage /> },
      { path: "events/:id", element: <EventDetailPage />, loader: eventLoader(queryClient) },
      { path: "booking/:id", element: <BookingPage /> },
      { path: "bookings", element: <MyBookingsPage /> },
      { path: "create-event", element: <CreateEventPage /> },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
