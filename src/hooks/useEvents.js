import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

const fetchEvents = async ()=>{

    const {data, error} = await supabase.from("events").select(`
        *,
        ticket_types(*)`);

    if (error) throw new Error (error.message);

    return data.map((event)=> ({
        ...event,
        date: event.event_date,
        time: event.event_time,
        organizerName: event.organizer_name,
        ticketTypes: event.ticket_types,
    }));
};

export const useEvents=()=>{
    return useQuery({
        queryKey: ["events"],
        queryFn: fetchEvents,
        staleTime: 60000*5,
    })
}