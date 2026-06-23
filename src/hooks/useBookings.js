import { useQuery } from "@tanstack/react-query";
import { fetchBookings } from "../services/bookingService";


export const useBookings=()=>{
    return useQuery({
        queryKey: ["bookings"],
        queryFn: fetchBookings,
        staleTime: 60000,
        
    })
    
    
}