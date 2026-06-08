const API_URL = 'http://localhost:3001'

// just for genrating the random #
export const generateReference = () => {
  return 'BK' + Math.random().toString(36).substring(2, 8).toUpperCase()
}

//building the booking so we can send to the server
export const buildBooking = (state, event) => {
  return {
    userId:          'user1',
    eventId:         event.id,
    eventTitle:      event.title,
    eventDate:       event.date,
    tickets: [{
      type:     state.selectedTicket.name,
      quantity: state.quantity,
      price:    state.selectedTicket.price,
    }],
    attendees:       state.attendeesInfo,
    totalAmount:     state.totalAmount,
    status:          'confirmed',
    bookingDate:     new Date().toISOString().split('T')[0],
    referenceNumber: generateReference(),
  }
}


export const saveBooking = async (booking) => {
  const res = await fetch(`${API_URL}/bookings`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(booking),
  })
  if (!res.ok) throw new Error('Failed to save booking')
  return res.json()
}