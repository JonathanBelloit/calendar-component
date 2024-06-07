import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchEvents, selectEvents } from "../../redux/eventSlice";
import { useSelector } from "react-redux";
import { getCurrentUserEmail } from "../../hooks/useCurrentUserEmail";

const EventList = () => {
  const dispatch = useAppDispatch();
  const userEmail = getCurrentUserEmail();
  const events = useSelector(selectEvents);

  useEffect(() => {
    if (userEmail) {
      dispatch(fetchEvents(userEmail));
    }
  }, [dispatch, userEmail]);

  return (
    <>
      <Box sx={{ backgroundColor: 'rgba(255,255,255, 0.2)', p: 1, borderRadius: 3 }}>
        <Typography variant="h4">Today's Events:</Typography>
        {events.filter(event => {
          const eventDate = new Date(event.dateString);
          const today = new Date();
          return eventDate.toDateString() === today.toDateString();
        }).map(event => (
          <Typography key={event.id}>{event.title}</Typography>
        ))}
      </Box>
      <Box sx={{ backgroundColor: 'rgba(255,255,255, 0.2)', p: 1, borderRadius: 4 }}>
        <Typography variant="h4">Tomorrow's Events:</Typography>
        {events.filter(event => {
          const eventDate = new Date(event.dateString);
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          return eventDate.toDateString() === tomorrow.toDateString();
        }).map(event => (
          <Typography key={event.id}>{event.title}</Typography>
        ))}
      </Box>
      <Box sx={{ backgroundColor: 'rgba(255,255,255, 0.2)', p: 1, borderRadius: 4 }}>
        <Typography variant="h4">This Month's Events:</Typography>
        {events.filter(event => {
          const eventDate = new Date(event.dateString);
          const today = new Date();
          return eventDate.getMonth() === today.getMonth();
        }).map(event => (
          <Typography key={event.id}>{event.title}</Typography>
        ))}
      </Box>
    </>
  );
};

export default EventList;
