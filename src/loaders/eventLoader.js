import { defer } from "react-router-dom";
import { fetchEvent } from "../hooks/useEvent";



const fetchReviews = async (eventId) => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return [
    { id: 1, author: "Robel I.", rating: 5, comment: "One of the best events I've attended. Incredibly well organized." },
    { id: 2, author: "John D.", rating: 4, comment: "Great speakers and a fantastic venue. Would definitely go again." },
    { id: 3, author: "Alice R.", rating: 5, comment: "Exceeded all my expectations. Already signed up for next year!" },
  ];
};

export const eventLoader = (queryClient) => async ({ params }) => {
  
  await queryClient.prefetchQuery({
    queryKey: ["event", params.id],
    queryFn: () => fetchEvent(params.id),
  });

  
  const reviewsPromise = fetchReviews(params.id);
  return defer({ reviews: reviewsPromise });

  
};

