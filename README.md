# Evently 🎟
A full-featured Event Management Platform built as a hands-on course project. Users can browse events, book tickets, manage their bookings, and create new events — powered by Supabase and built with modern React patterns.

---

## Installation & Running

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Features

### Events Listing & Discovery (`/`)
- Card-based event grid with title, date, location, price, and category
- Search by event title or category via the Hero search bar — powered by `useDeferredValue` for non-blocking UI updates
- Filter by category pills (Music, Technology, Sports, Arts, Food, Business, Wellness)
- Quick filters: Upcoming, This Week, This Month, Free Only, Under $50, $50+
- Sort by date or price (low to high / high to low)
- Like/favourite toggle with **optimistic updates** and automatic rollback on failure
- Favourite state persisted to `localStorage` so the heart survives navigation and refresh
- TanStack Query with 5 minute `staleTime` for intelligent caching

### Event Details (`/events/:id`)
- Full event info: description, date, time, location, venue, organizer
- Loader prefetches event into TanStack Query cache before the page renders
- `defer` + `<Await>` + `<Suspense>` streams reviews in after main content is already visible
- Available ticket types with pricing and a Book Tickets CTA

### Ticket Booking — 3-Step Flow (`/booking/:id`)
- **Step 1 – Select Tickets:** Choose ticket type and quantity with real-time price calculation
- **Step 2 – Attendee Details:** Name, email, and phone with field-level validation and inline error messages
- **Step 3 – Confirmation:** Booking summary, generated reference number, and link to My Bookings
- Multi-step state managed by `useReducer`; progress indicator and back navigation throughout
- `useMutation` for Supabase submission (booking + tickets + attendees in one transaction)

### My Bookings (`/bookings`)
- TanStack Query with 1 minute `staleTime`
- Filter by Upcoming or Past tabs
- Cancel upcoming bookings with a confirmation modal (rendered via React Portal)
- Cancel uses **optimistic update** — booking marked cancelled instantly, rolls back if server fails

### Create Event (`/create-event`)
- **Step 1 – Basic Info:** Title, description, category, image URL with live preview
- **Step 2 – Date, Location & Tickets:** Date, time, venue, location, dynamic ticket types (add/remove)
- **Step 3 – Preview & Publish:** Full preview before submitting
- Multi-step form state managed entirely by **Redux Toolkit** with `createSlice`
- `createAsyncThunk` handles the async Supabase publish
- Draft auto-saved to `localStorage` on every change — survives page refresh
- Invalidates events cache on publish so the new event appears on the listing immediately

### Profile (`/profile`)
- Displays simulated user info from `AuthContext`
- Theme preference toggle (light/dark)

### Theme
- Light and dark mode via `ThemeContext`
- Toggle button in the Navbar
- Preference persisted to `localStorage`

### Routing & Error Handling
- `createBrowserRouter` with nested routes under a shared `RootLayout`
- Loaders for data prefetching on the event details route
- `errorElement` on every route for graceful error handling
- 404 page for unmatched routes

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Routing | React Router v6 |
| Server State | TanStack Query v5 |
| Global Form State | Redux Toolkit |
| Global UI State | Context API (Theme, Auth) |
| Database | Supabase (PostgreSQL) |
| Styling | Vanilla CSS with CSS custom properties |

---

## React Concepts Demonstrated

- **TanStack Query** — `useQuery` for all data fetching with caching, `useMutation` for all writes with optimistic updates and rollback
- **Redux Toolkit** — `createSlice` + `createAsyncThunk` for the Create Event multi-step wizard
- **useReducer** — multi-step booking flow state machine
- **Context API** — `ThemeContext` for dark/light mode, `AuthContext` for simulated user state
- **useDeferredValue** — non-blocking search filtering on the events listing
- **defer + Await + Suspense** — streaming deferred data (reviews) on the event details page
- **Optimistic updates** — like toggle and booking cancellation update the UI before the server responds, with automatic rollback on failure
- **Loader prefetching** — event data prefetched into TanStack Query cache before the route renders
- **errorElement** — per-route error boundaries for graceful failure handling
- **Portals** — cancellation confirmation modal in My Bookings
- **Component composition** — data flows from page-level hooks down through FilterBar, EventsGrid, EventCard
- **Conditional rendering** — loading spinners, error states, empty states throughout
- **Form handling** — attendee details and create event forms with field-level validation

---

## State Management Strategy

| State Type | Tool | Example |
|---|---|---|
| Server state | TanStack Query | Events, bookings |
| Complex form | Redux Toolkit | Create Event wizard |
| Auth / User | AuthContext | Simulated user |
| Theme | ThemeContext | Light / dark mode |
| Local UI | useState / useReducer | Filters, booking steps, tabs |
| Persistence | localStorage | Favourites, draft, theme |

---

## Project Structure

```
src/
├── assets/
├── components/
│   ├── BookingCard.jsx
│   ├── BookingProgress.jsx
│   ├── BookingStep1.jsx
│   ├── BookingStep2.jsx
│   ├── BookingStep3.jsx
│   ├── CreateEventStep1.jsx
│   ├── CreateEventStep2.jsx
│   ├── CreateEventStep3.jsx
│   ├── ErrorPage.jsx
│   ├── EventCard.jsx
│   ├── EventsGrid.jsx
│   ├── FilterBar.jsx
│   ├── Footer.jsx
│   ├── FormInput.jsx
│   ├── Hero.jsx
│   ├── Modal.jsx
│   ├── Navbar.jsx
│   ├── ScrollToTop.jsx
│   └── StatsBar.jsx
├── context/
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
├── hooks/
│   ├── useBookings.js
│   ├── useEvent.js
│   └── useEvents.js
├── layouts/
│   └── RootLayout.jsx
├── loaders/
│   └── eventLoader.js
├── pages/
│   ├── BookingPage.jsx
│   ├── CreateEventPage.jsx
│   ├── EventDetailPage.jsx
│   ├── EventsPage.jsx
│   ├── MyBookingsPage.jsx
│   └── ProfilePage.jsx
├── reducers/
│   └── bookingReducer.js
├── services/
│   └── bookingService.js
├── store/
│   ├── createEventSlice.js
│   └── index.js
├── lib/
│   └── supabase.js
├── components.css
├── index.css
├── App.jsx
└── main.jsx
```

---

## Design & Styling

The UI follows a minimalist purple/violet aesthetic. Rather than using a pre-built component library like Bootstrap or MUI, the styling was designed from scratch using **vanilla CSS with CSS custom properties** for theming. The visual design was first sketched as a reference, and Claude AI was used to translate it into production CSS — a workflow similar to using a Figma-to-code tool, but more iterative and customized to the project's design system.

All CSS lives in two files:
- `index.css` — global resets, CSS variables, typography, layout utilities
- `components.css` — component-specific styles

This approach kept full control over the design system without the overhead of learning a CSS framework.

---

## Known Limitations

- No real authentication — user is hardcoded as `user1`
- Reviews on the event details page are simulated with a 1.5s delay to demonstrate the `defer` streaming pattern
