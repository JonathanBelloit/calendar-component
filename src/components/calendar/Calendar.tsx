import { Box, Button, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { TbSquareRoundedArrowLeftFilled } from "react-icons/tb";
import { TbSquareRoundedArrowRightFilled } from "react-icons/tb";
import { useSelector } from "react-redux";
import { fetchUserData, selectUserData } from "../../redux/userSlice";
import { selectEvents, fetchEvents } from "../../redux/eventSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getCurrentUserEmail } from "../../hooks/useCurrentUserEmail";
import { getEventsForDate } from '../../utils/eventUtils';
import InfoPanel from "./InfoPanel";
import CalendarHeader from "./CalendarHeader";
import DayCell from "./DayCell";
import EventDialog from "./EventDialog";

const Calendar = () => {
  const dispatch = useAppDispatch();
  const userEmail = getCurrentUserEmail();
  const events = useSelector(selectEvents)
  const userData = useSelector(selectUserData)

  useEffect(() => {
    if (userEmail) {
      dispatch(fetchEvents(userEmail))
      dispatch(fetchUserData({userEmail}))
    }
  }, [dispatch, userEmail])

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear())
  // const [selectedDay, setSelectedDay] = useState(currentDate);
  const [showEventDialog, setShowEventDialog] = useState(false)
  
  // Event state variables

  const [targetDate, setTargetDate] = useState<Date>();

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
    setTargetDate(clickedDate);

    const isToday = (day1: Date, day2: Date) => {
      return (
        day1.getFullYear() === day2.getFullYear() &&
        day1.getMonth() === day2.getMonth() &&
        day1.getDate() === day2.getDate()
      );
    };

    if (clickedDate >= today || isToday(clickedDate, today)) {
      setTargetDate(clickedDate);
      setShowEventDialog(true);
    }
  };
  
  // const eventsPerDay = dailyEventCount(events);
  return (
    <>
      <Grid container spacing={0} sx={{ backgroundColor: 'background.default', minHeight: '100vh', p: 1, gap: 1, height: '100vh', display: 'flex', flexGrow: 1 }}> {/* Main wrapper */}
        <Grid item xs={12} sm={6.5}  sx={{ flexGrow: 1, backgroundColor: 'blue' }}> {/* Calendar wrapper */}
          <CalendarHeader userEmail={userEmail} userFirstName={userData?.firstName} />
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
                const dateKey = new Date(currentYear, currentMonth, day + 1).toDateString();
                const eventsForDay = getEventsForDate(events, dateKey); // Get events for the specific day
                const eventCount = eventsForDay.length;
                return (
                  <DayCell isToday={isToday} eventCount={eventCount} handleDayClick={handleDayClick} day={day} key={day} events={eventsForDay} sharedUsers={userData?.sharingAllowed || []} />
                );
              })}
              </Grid>
            </Box>
            <Button onClick={resetDay}>Go Back to Today</Button>
            {
              <EventDialog
                showEventDialog={showEventDialog}
                setShowEventDialog={setShowEventDialog}
                userEmail={userEmail ? userEmail : ''}
                targetDate={targetDate ? targetDate : new Date()}
            />
            }
        </Grid>
        <Grid item xs={12} sm={5.4} sx={styles.eventGrid}>
          <InfoPanel />
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
  eventGrid: {
    border: '1px solid white',
  }
}