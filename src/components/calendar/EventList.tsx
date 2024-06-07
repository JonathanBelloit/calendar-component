import { Box, Typography } from "@mui/material";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchEvents, selectEvents } from "../../redux/eventSlice";
import { useSelector } from "react-redux";
import { getCurrentUserEmail } from "../../hooks/useCurrentUserEmail";
import { useEffect } from "react";
import EventItem from "./EventItem";

const EventList = () => {
  const dispatch = useAppDispatch();
  const userEmail = getCurrentUserEmail();
  const events = useSelector(selectEvents);

  useEffect(() => {
    const fetchEventsIfUserEmailAvailable = async () => {
      if (userEmail) {
        dispatch(fetchEvents(userEmail));
      } else {
        // Handle the case when the user's email is not available
        console.log("User's email is not available. Please log in again.");
        // You can also show a message to the user or redirect them to the login page
      }
    };

    fetchEventsIfUserEmailAvailable();
  }, [dispatch, userEmail]);

  const isToday = (dateString: string) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    return eventDate.toDateString() === today.toDateString();
  };

  const isTomorrow = (dateString: string) => {
    const eventDate = new Date(dateString);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return eventDate.toDateString() === tomorrow.toDateString();
  };

  const isThisMonth = (dateString: string) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    return eventDate.getMonth() === today.getMonth();
  };

  return (
    <>
      <Box sx={{ backgroundColor: 'rgba(255,255,255, 0.2)', p: 1, borderRadius: 3 }}>
        <Typography variant="h4">Today's Events:</Typography>
        {events.filter(event => isToday(event.date)).map(event => (
          <EventItem event={event} />
        ))}
      </Box>
      <Box sx={{ backgroundColor: 'rgba(255,255,255, 0.2)', p: 1, borderRadius: 4 }}>
        <Typography variant="h4">Tomorrow's Events:</Typography>
        {events.filter(event => isTomorrow(event.date)).map(event => (
          <EventItem event={event} />
        ))}
      </Box>
      <Box sx={{ backgroundColor: 'rgba(255,255,255, 0.2)', p: 1, borderRadius: 4 }}>
        <Typography variant="h4">This Month's Events:</Typography>
        {events.filter(event => isThisMonth(event.date)).map(event => (
          <EventItem event={event} />
        ))}
      </Box>
    </>
  );
};

export default EventList;
