

// export const eventLoader = async ({ params }) => {

//     const response = await fetch(`http://localhost:3001/events/${params.id}`)

//     if (!response.ok) {
//         throw new Error('Failed to fetch event details')
//     }
//     const event = await response.json()
//     return event
// }


import { supabase } from "../lib/supabase";

export const eventLoader = async ({ params }) => {
  const { data, error } = await supabase
    .from("events")
    .select(`
      *,
      ticket_types(*)
    `)
    .eq("id", params.id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    ...data,
    date: data.event_date,
    time: data.event_time,
    organizerName: data.organizer_name,
    ticketTypes: data.ticket_types || [],
  };
};
