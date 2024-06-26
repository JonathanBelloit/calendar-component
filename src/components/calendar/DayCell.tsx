import { Grid, Box, Badge } from "@mui/material";
import { Event } from "../../redux/eventSlice";

const DayCell = ({
  isToday,
  eventCount,
  day,
  handleDayClick,
  events,
  sharedUsers,
}: {
  isToday: boolean;
  eventCount: number;
  day: number;
  handleDayClick: (day: number) => void;
  events: Event[];
  sharedUsers: { email: string; color: string }[];
}) => {
  // console.log(events, `events for day ${day}`);
  // console.log(sharedUsers);
  
  const getBorderColor = () => {
    if (!events || events.length === 0) {
      return 'none';
    }

    for (const event of events) {
      const sharedUser = sharedUsers.find(user => user.email === event.user);
      if (sharedUser) {
        return sharedUser.color;
      }
    }

    return 'none';
  };

  const dayBorderStyle = isToday ? 'solid 2px orange' : `solid 2px ${getBorderColor()}`;

  return (
    <Grid item xs={1} sx={{ p: 0.2 }} key={day + 1}>
      <Box
        sx={isToday ? styles.currentDay : {...styles.dayGrid, border: dayBorderStyle }}
        onClick={() => handleDayClick(day + 1)}
      >
        {day + 1}
      <Badge
        badgeContent={eventCount}
        color="primary"
        sx={{
          display: "flex",
          position: "absolute",
          right: 10,
          top: 10,
          zIndex: 20,
        }}
      ></Badge>
      </Box>
    </Grid>
  );
};

export default DayCell;

const styles = {
  dayGrid: {
    display: "flex",
    position: "relative",
    aspectRatio: "1 / 1",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    border: 'none',
    borderRadius: 2,
    p: 1,
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
  },
  currentDay: {
    display: "flex",
    aspectRatio: "1 / 1",
    color: "white",
    backgroundColor: "rgba(255, 165, 0, 0.8)",
    boxShadow: "0 0 20px 5px rgba(255, 165, 0, 0.4)",
    borderRadius: "50%",
    p: 1,
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: "rgba(255, 165, 0, 0.9)",
    },
  },
};
