import { Box, Button, Grid, Dialog, TextField, DialogContent, DialogAction, DialogTitle, Typography, Stack, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useState } from "react";
import { TbSquareRoundedArrowLeftFilled } from "react-icons/tb";
import { TbSquareRoundedArrowRightFilled } from "react-icons/tb";

const Calendar = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear())
  const [selectedDay, setSelectedDay] = useState(currentDate);
  const [showEventDialog, setShowEventDialog] = useState(false)
  const [morningOrAfternoon, setMorningOrAfternoon] = useState('am')

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const prevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1))
    setCurrentYear((prevYear) => (currentMonth === 0 ? prevYear - 1 : prevYear))
  }

  const nextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1))
    setCurrentYear((prevYear) => (currentMonth === 11 ? prevYear + 1 : prevYear))
  }

  const resetDay = () => {
    setCurrentMonth(currentDate.getMonth())
    setCurrentYear(currentDate.getFullYear())
  }

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    const today = new Date();

    const isToday = (day1: Date, day2: Date) => {
      return (
        day1.getFullYear() === day2.getFullYear() &&
        day1.getMonth() === day2.getMonth() &&
        day1.getDate() === day2.getDate()
      );
    };

    if (clickedDate >= today || isToday(clickedDate, today)) {
      setSelectedDay(clickedDate);
      setShowEventDialog(true);
    }
  };

  return (
    <>
      <Grid container spacing={5} sx={{ backgroundColor: 'blue', minHeight: '100vh', p: 1, gap: 1, height: '100vh', display: 'flex', flexGrow: 1 }}> {/* Main wrapper */}
        <Grid item xs={12} sm={6.5}  sx={{ flexGrow: 1, backgroundColor: 'blue' }}> {/* Calendar wrapper */}
          <h1>Jon's Calendar</h1>
          <Grid container sx={styles.dateNavigationWrapper}> {/* Calendar Date Navigation */}
            <Grid item xs={2} sx={{display: 'flex', justifyContent: 'center'}}>
              <TbSquareRoundedArrowLeftFilled onClick={prevMonth} />
            </Grid>
              <Grid item xs={8} sx={styles.monthYearNav}>
                <h2>{months[currentMonth]}</h2>
                <h2>{currentYear}</h2>
              </Grid>
            <Grid item xs={2} sx={{display: 'flex', justifyContent: 'center'}}>
              <TbSquareRoundedArrowRightFilled onClick={nextMonth}/>
            </Grid>
          </Grid>
          
            <Box sx={styles.dateGridWrapper}>
              <Grid container spacing={0} columns={7}>
                {daysOfWeek.map((day) => {
                  return <Grid item xs={1} sx={styles.dayGridTitle} key={day}>{day}</Grid>
                })}
              </Grid>
              
              <Grid container spacing={0} columns={7} sx={{ mb: 5 }}> {/* Calendar Date Grid */}
                {[...Array(firstDayOfMonth).keys()].map((_, index) => (
                  <Grid item xs={1} key={`empty-${index}`}/>
                ))}
                {[...Array(daysInMonth).keys()].map((day) => {
                  const isToday = currentYear === currentDate.getFullYear() && currentMonth === currentDate.getMonth() && day + 1 === currentDate.getDate();
                  return (
                  <Grid item xs={1} sx={{ p: .2 }} key={day + 1}>
                    <Box sx={isToday ? styles.currentDay : styles.dayGrid} onClick={() => handleDayClick(day+1)}>
                      {day + 1}
                    </Box>
                  </Grid>
                  )
                })}
              </Grid>
            </Box>
            <Button onClick={resetDay}>Go Back to Today</Button>
            <Dialog
              open={showEventDialog}
              onClose={() => setShowEventDialog(false)}
              >
                <DialogTitle sx={{ textAlign: 'center', color: 'white', mb: 3, backgroundColor: 'rgba(42,82,120,1.00)'}}>Add New Event</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', p: 5, gap: 2 }}>
                  <Stack direction='row'>
                    <TextField type='number' inputProps={{ min: 1, max: 12 }} sx={{ maxWidth: '5rem' }} />
                    <Typography variant='h4'>:</Typography>
                    <TextField type='number' inputProps={{ min: 0, max: 59 }} sx={{ maxWidth: '5rem' }} />
                    <ToggleButtonGroup 
                      value={morningOrAfternoon}
                      onChange={(e) => setMorningOrAfternoon(e.target.value)}
                    >
                      <ToggleButton value="am">
                        AM
                      </ToggleButton>
                      <ToggleButton value="pm">
                        PM
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Stack>
                  <TextField fullWidth multiline rows={5} />
                </DialogContent>
              </Dialog>
        </Grid>
        <Grid item xs={12} sm={5.3} sx={styles.eventGrid}>
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
    justifyContent: 'center',
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
    aspectRatio: '1 / 1',
    // border: '1px solid black',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    p: 1,
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.5)'
    }
  },
  currentDay: {
    display: 'flex',
    aspectRatio: '1 / 1',
    color: 'white',
    backgroundColor: 'rgba(255, 165, 0, 0.8)',
    boxShadow: '0 0 20px 5px rgba(255, 165, 0, 0.4)',
    borderRadius: '50%',
    p: 1,
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: 'rgba(255, 165, 0, 0.9)'
    }
  },
  eventGrid: {
    p: 5,
    border: '1px solid black',
  }
}