import { Box, Typography, Button } from "@mui/material";
import { addHours, startOfDay, format } from 'date-fns';

const HourlySchedule = ({ date, schedule, handleToggleAvailability }) => {
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hourStart = addHours(startOfDay(date), i);
    const formattedTime = format(hourStart, 'hh:00 a');
    // const scheduleItem = schedule.find(item => new Date(item.time).getHours() === hourStart.getHours());

    return (
      <Box key={i} sx={{ mb: 1, p: 1, border: '1px solid grey', borderRadius: 2 }}>
        <Typography variant="body1"><strong>{formattedTime}</strong></Typography>
        {/* {scheduleItem ? ( */}
          <>
            <Typography>test</Typography>
            {/* <Typography variant="body1">{scheduleItem.title}</Typography> */}
            {/* <Typography variant="body2">{scheduleItem.description}</Typography> */}
            {/* <Button variant="contained" color="primary" onClick={() => handleToggleAvailability(scheduleItem)}>
              {scheduleItem.available ? "Mark as Unavailable" : "Mark as Available"}
            </Button> */}
          </>
        {/* ) : (
          <Button variant="contained" color="primary" onClick={() => handleToggleAvailability({ time: hourStart, available: true })}>
            Mark as Available
          </Button>
        )} */}
      </Box>
    );
  });

  return <Box>{hours}</Box>;
};

export default HourlySchedule;
