import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import BookingPage from "./pages/BookingPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import RootLayout from "./layouts/RootLayout";
import { eventLoader } from "./loaders/eventLoader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CreateEventPage from "./components/CreateEventPage";
import ErrorPage from "./components/ErrorPage";
import ProfilePage from "./pages/ProfilePage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <EventsPage /> },
      { path: "events/:id", element: <EventDetailPage />, loader: eventLoader(queryClient), errorElement: <ErrorPage/> },
      { path: "booking/:id", element: <BookingPage />, errorElement: <ErrorPage/> },
      { path: "bookings", element: <MyBookingsPage />, errorElement: <ErrorPage/> },
      { path: "create-event", element: <CreateEventPage />, errorElement: <ErrorPage/> },
      { path: "profile", element: <ProfilePage />, errorElement: <ErrorPage /> },
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
