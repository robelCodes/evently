import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

export const fetchEvent = async (id)=>{
    const {data, error} = await supabase
    .from("events")
    .select(`*, ticket_types(*)`)
    .eq("id", id)
    .single();
    
    
    if (error) throw new Error(error.message);

    return {
        ...data,
        date: data.event_date,
        time: data.event_time,
        organizerName: data.organizer_name,
        ticketTypes: data.ticket_types || [],
    };
};

export const useEvent =(id)=>{
    return useQuery({
        queryKey:["event", id],
        queryFn: ()=> fetchEvent(id),
        staleTime: 60000,
    });
};
