import { Box, Grid } from "@mui/material";
import { useState } from "react";
import { TbSquareRoundedArrowLeftFilled } from "react-icons/tb";
import { TbSquareRoundedArrowRightFilled } from "react-icons/tb";

const Calendar = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear())

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  console.log(currentMonth, currentYear, daysInMonth, firstDayOfMonth);
  return (
    <>
      <Grid container spacing={5} sx={{ backgroundColor: 'blue', minHeight: '100vh', p: 1, gap: 1, height: '100vh', display: 'flex', flexGrow: 1 }}> {/* Main wrapper */}
        <Grid item xs={6.5} sx={{ flexGrow: 1, backgroundColor: 'blue' }}> {/* Calendar wrapper */}
          <h1>Jon's Calendar</h1>
          <Box sx={styles.dateNavigationWrapper}> {/* Calendar Date Navigation */}
            <TbSquareRoundedArrowLeftFilled />
              <Box sx={styles.monthYearNav}>
                <h2>June</h2>
                <h2>2024</h2>
              </Box>
            <TbSquareRoundedArrowRightFilled />
          </Box>
          
            <Box sx={styles.dateGridWrapper}>
              <Grid container spacing={0} columns={7}>
                {daysOfWeek.map((day) => {
                  return <Grid item xs={1} sx={styles.dayGridTitle} key={day}>{day}</Grid>
                })}
              </Grid>
              
              <Grid container spacing={0} columns={7} sx={{ mb: 5 }}> {/* Calendar Date Grid */}
                {[...Array(firstDayOfMonth).keys()].map((_, index) => (
                  <Grid item xs={1} sx={styles.dayGrid} key={`empty-${index}`}/>
                ))}
                {[...Array(daysInMonth).keys()].map((day) => (
                  <Grid item xs={1} sx={styles.dayGrid} key={day + 1}>{day + 1}</Grid>
                ))}
              </Grid>
            </Box>
        </Grid>
        <Grid item xs={5} sx={styles.eventGrid}>
          <Box>{/* Event Dialog Placeholder */}</Box>
          <Box>
            <h1>Today's Events</h1>
          </Box>
          <Box>
            <h1>Events this Month</h1>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default Calendar

const styles = {
  dateNavigationWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    fontSize: '2rem',
    my: 2
  },
  monthYearNav: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2
  },
  dateGridWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: "center",
    justifyItems: "center",
    border: '1px solid black',
    borderRadius: '2rem',
    // gap: 1,
    width: "100%",
  },
  dayGridTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '4rem',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    textTransform: 'uppercase'
  },
  dayGrid: {
    display: 'flex',
    border: '1px solid black',
    alignItems: 'center',
    justifyContent: 'center',
    height: '4rem',
    
  },
  eventGrid: {
    p: 5,
    border: '1px solid black',
  }
}