# Evently — Event Management Platform

A React-based event management platform built as a hands-on course project. Users can browse events, book tickets, and manage their bookings — all powered by a mock REST backend.

---

## Live Demo

- **Frontend:** Deployed on Netlify
- **Backend:** json-server running locally via `npm run server`

---

## Features

### Events Listing & Discovery
- Card-based event grid with title, date, location, price, and category
- Search by event title or category via the Hero search bar
- Filter by category pills (Music, Technology, Sports, Arts, Food, Business, Wellness)
- Quick filters: Upcoming, This Week, This Month, Free Only, Under $50, $50+
- Sort by date, price (low to high / high to low), or top rated
- Favourite/like toggle icon on each event card

### Event Details Page
- Full event information: description, date, time, location, venue, organizer
- Available ticket types with pricing
- "Book Tickets" button linking to the booking flow

### Ticket Booking (3-Step Flow)
- **Step 1 – Select Tickets:** Choose ticket type and quantity with real-time price calculation
- **Step 2 – Attendee Details:** Form with name, email, and phone validation and inline error messages
- **Step 3 – Confirmation:** Booking summary with a generated reference number and link to My Bookings
- Progress indicator throughout; back navigation between steps

### My Bookings
- Lists all user bookings with event name, date, ticket count, total amount, and status
- Filter by Upcoming or Past events
- Cancel upcoming bookings with a confirmation dialog (rendered via React Portal)

### Theme Toggle
- Light and dark mode via ThemeContext
- Toggle button in the Navbar
- Theme preference persisted in `localStorage`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite |
| Routing | React Router v6 |
| State | useState, useReducer, Context API |
| Backend | json-server (mock REST API) |
| Styling | Vanilla CSS with CSS custom properties |

---

## React Concepts Demonstrated

- **Component composition and props** — data flows from EventsPage down through FilterBar, EventsGrid, and EventCard
- **useState** — local UI state (search term, sort order, favourite toggle, form fields)
- **useReducer** — multi-step booking flow state machine
- **useEffect** — data fetching on mount
- **Context API** — ThemeContext for global dark/light mode
- **useRef** — auto-focus on the Hero search input
- **Portals** — cancellation confirmation modal in MyBookingsPage
- **Conditional rendering** — loading spinner, error state, empty state messages
- **List rendering** — event cards and booking rows with proper keys
- **Form handling** — attendee details form with field-level validation

---

## Project Structure

```
evently/
├── evently-api/             ← separate repo for json-server backend
│   ├── db.json
│   └── package.json
│
└── src/
    ├── assets/
    ├── components/
    │   ├── BookingCard.jsx
    │   ├── BookingProgress.jsx
    │   ├── BookingStep1.jsx
    │   ├── BookingStep2.jsx
    │   ├── BookingStep3.jsx
    │   ├── EventCard.jsx
    │   ├── EventsGrid.jsx
    │   ├── FeaturedEvents.jsx
    │   ├── FilterBar.jsx
    │   ├── Footer.jsx
    │   ├── FormInput.jsx
    │   ├── Hero.jsx
    │   ├── Modal.jsx
    │   ├── Navbar.jsx
    │   ├── ScrollToTop.jsx
    │   └── StatsBar.jsx
    ├── context/
    │   └── ThemeContext.jsx
    ├── data/
    │   └── db.json
    ├── hooks/
    ├── layouts/
    │   └── RootLayout.jsx
    ├── loaders/
    ├── pages/
    │   ├── BookingPage.jsx
    │   ├── EventDetailPage.jsx
    │   ├── EventsPage.jsx
    │   └── MyBookingsPage.jsx
    ├── reducers/
    │   └── bookingReducer.js
    ├── services/
    │   └── bookingService.js
    ├── store/
    ├── App.css
    ├── App.jsx
    ├── components.css
    ├── index.css
    └── main.jsx
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- npm

### Installation

```bash
# Clone the repo
git clone https://github.com/robelCodes/evently.git
cd evently

# Install frontend dependencies
npm install

# Install json-server globally (if not already installed)
npm install -g json-server
```

### Running Locally

Open two terminals:

```bash
# Terminal 1 — start the mock backend
json-server --watch db.json --port 3001

# Terminal 2 — start the React app
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

---

## Design & Styling

The UI follows a minimalist purple/violet aesthetic. Rather than using a pre-built component library like Bootstrap or MUI, the styling was designed from scratch using **vanilla CSS with CSS custom properties** for theming. The visual design was first sketched as a reference, and Claude AI was used to translate it into production CSS — a workflow similar to using a Figma-to-code tool, but more iterative and customized to the project's design system.

All CSS lives in two files:
- `index.css` — global resets, CSS variables, typography, layout utilities
- `components.css` — component-specific styles

This approach kept full control over the design system without the overhead of learning a CSS framework.

---

## API Endpoints (json-server)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/events` | Fetch all events |
| GET | `/events/:id` | Fetch a single event |
| GET | `/bookings?userId=user1` | Fetch user bookings |
| POST | `/bookings` | Create a new booking |
| PATCH | `/bookings/:id` | Update booking (cancellation) |

---

## Known Limitations

- No real authentication — user is hardcoded as `user1`
- Favourites are not persisted (local component state only)
- json-server is a mock backend and not suitable for production use
