import { supabase } from "../lib/supabase"




export const generateReference = () => {
  return 'BK' + Math.random().toString(36).substring(2, 8).toUpperCase()
}


export const buildBooking = (state, event) => {
  return {
    userId: "user1",
    eventId: event.id,
    eventTitle: event.title,
    eventDate: event.date,
    tickets: [
      {
        type: state.selectedTicket.name,
        quantity: state.quantity,
        price: state.selectedTicket.price,
      },
    ],
    attendees: state.attendeesInfo,
    totalAmount: state.totalAmount,
    status: "confirmed",
    bookingDate: new Date().toISOString().split("T")[0],
    referenceNumber: generateReference(),
  };
};



export const saveBooking = async (booking) => {
  
  const { data: bookingData, error: bookingError } = await supabase
    .from("bookings")
    .insert([
      {
        user_id: booking.userId,
        event_id: booking.eventId,
        event_title: booking.eventTitle,
        event_date: booking.eventDate,
        total_amount: booking.totalAmount,
        status: booking.status,
        booking_date: booking.bookingDate,
        reference_number: booking.referenceNumber,
      },
    ])
    .select()
    .single();

  if (bookingError) throw bookingError;

  const bookingId = bookingData.id;

  try {
    
    const ticketRows = booking.tickets.map((t) => ({
      booking_id: bookingId,
      ticket_type: t.type,
      quantity: t.quantity,
      price: t.price,
    }));

    const { error: ticketError } = await supabase
      .from("booking_tickets")
      .insert(ticketRows);

    if (ticketError) throw ticketError;

    
    const attendeeRows = booking.attendees.map((a) => ({
      booking_id: bookingId,
      name: a.name,
      email: a.email,
      phone: a.phone,
    }));

    const { error: attendeeError } = await supabase
      .from("attendees")
      .insert(attendeeRows);

    if (attendeeError) throw attendeeError;

    return bookingData;
  } catch (err) {
    
    await supabase.from("bookings").delete().eq("id", bookingId);
    throw err;
  }
};



export const fetchBookings = async () => {
  const { data, error } = await supabase.from("bookings").select(`
      *,
      booking_tickets (*),
      attendees (*)
    `);

  if (error) throw error;

  return data.map((b) => ({
    ...b,    
    eventDate: b.event_date,
    eventTitle: b.event_title,
    bookingDate: b.booking_date,
    referenceNumber: b.reference_number,
    userId: b.user_id,
    totalAmount: b.total_amount,
  }));
};







// export const cancelBooking = async (id) => {
//   const res = await fetch(`http://localhost:3001/bookings/${id}`, {
//     method:  'PATCH',
//     headers: { 'Content-Type': 'application/json' },
//     body:    JSON.stringify({ status: 'cancelled' }),
//   })
//   if (!res.ok) throw new Error('Failed to cancel booking')
//   return res.json()
// }


export const cancelBooking = async (id) => {
  const { data, error } = await supabase
    .from("bookings")
    .update({ status: "cancelled" })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
};