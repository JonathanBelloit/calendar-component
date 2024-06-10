import { Box, Paper, Typography } from '@mui/material'
import { useState } from 'react'
import { formatDate } from '../../utils/dateUtils';
import { IoCloseOutline } from "react-icons/io5";
import EventItemFooter from './EventItemFooter';


const EventItem = ({
  event,
  setEventTrigger,
}: {
  event: {
    id?: string;
    title: string;
    date: string;
    time: string;
    description: string;
    user?: string;
  };
  setEventTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const handleClose = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setShowDetails(false);
  };
  return (
    <Box sx={boxStyle} key={event.id} onClick={() => setShowDetails(true)}>
      {!showDetails && <Typography variant="h5">{event.title}</Typography>}
      {showDetails && (
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", px: 1 }}>
            <Typography variant="h5">{event.title}</Typography>
            <IoCloseOutline
              onClick={handleClose}
              fontSize={"2rem"}
              style={{ zIndex: 2, cursor: "pointer" }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              backgroundColor: "blue",
              my: 2,
            }}
          >
            <Typography variant="h5">{formatDate(event.date)}</Typography>
            <Typography variant="h5">{event.time}</Typography>
          </Box>
          <Box>
            <Paper sx={{ mx: 5, my: 5 }}>{event.description}</Paper>
            <Typography>Added by: {event.user || ""}</Typography>
          </Box>
          <EventItemFooter
            userEmail={event.user || ""}
            eventId={event.id || ""}
            setEventTrigger={setEventTrigger}
          />
        </Box>
      )}
    </Box>
  );
};

const boxStyle = {
  width: '100%',
  backgroundColor: '#3552A0',
  borderRadius: 3,
  p: 1,
  mb: 1,
  '&:hover': {
    backgroundColor: 'green'
  }
}

export default EventItem