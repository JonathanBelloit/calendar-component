import { Grid, Box, Badge } from "@mui/material";

const DayCell = ({
  isToday,
  eventCount,
  day,
  handleDayClick,
}: {
  isToday: boolean;
  eventCount: number;
  day: number;
  handleDayClick: (day: number) => void;
}) => {
  return (
    <Grid item xs={1} sx={{ p: 0.2 }} key={day + 1}>
      <Box
        sx={isToday ? styles.currentDay : styles.dayGrid}
        onClick={() => handleDayClick(day + 1)}
      >
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
        {day + 1}
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
