import { useEffect, useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Box, Typography, FormControl, InputLabel, Select, MenuItem, Button, TextField, Grid, Stack } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getCurrentUserEmail } from "../../hooks/useCurrentUserEmail";
import { fetchEvents, selectEvents } from "../../redux/eventSlice";
import { fetchSchedule, selectSchedule, updateScheduleItem } from "../../redux/scheduleSlice";
import { useSelector } from "react-redux";
import { formatISO, addHours, startOfDay, format } from 'date-fns';
import HourlySchedule from './HourlySchedule';
import { CiSettings } from "react-icons/ci";

const DailySchedule = () => {
  const dispatch = useAppDispatch();
  const userEmail = getCurrentUserEmail();
  const events = useSelector(selectEvents);
  const schedule = useSelector(selectSchedule);

  const [expanded, setExpanded] = useState<string | false>(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showSethours, setShowSetHours] = useState(false);

  // State for start and end hours
  const [sleepStart, setSleepStart] = useState(22); // Default to 10 PM
  const [sleepEnd, setSleepEnd] = useState(6); // Default to 6 AM
  const [workStart, setWorkStart] = useState(9); // Default to 9 AM
  const [workEnd, setWorkEnd] = useState(17); // Default to 5 PM

  useEffect(() => {
    if (userEmail) {
      dispatch(fetchEvents(userEmail));
      dispatch(fetchSchedule({ userEmail, date: formatISO(selectedDate, { representation: 'date' }) }));
    }
  }, [dispatch, userEmail, selectedDate]);

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleDateChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedDate(new Date(event.target.value as string));
  };

  const handleTimeChange = (setFunc: (value: number) => void) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFunc(parseInt(event.target.value));
  };

  const filteredHours = (start: number, end: number) => {
    let hours = [];
    if (start <= end) {
      hours = Array.from({ length: end - start }, (_, i) => start + i);
    } else {
      hours = [
        ...Array.from({ length: 24 - start }, (_, i) => start + i),
        ...Array.from({ length: end }, (_, i) => i)
      ];
    }
    return hours;
  };

  const renderHourlySchedule = (start: number, end: number) => {
    const hours = filteredHours(start, end).map(i => {
      const hourStart = addHours(startOfDay(selectedDate), i);
      const formattedTime = format(hourStart, 'hh:00 a');

      return (
        <Box key={i} sx={{ mb: 1, p: 1, border: '1px solid grey', borderRadius: 2 }}>
          <Typography variant="body1"><strong>{formattedTime}</strong></Typography>
          <Typography>test</Typography>
        </Box>
      );
    });

    return <Box>{hours}</Box>;
  };

  return (
    <Box sx={{ p: 3, backgroundColor: 'white', borderRadius: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" sx={{ mb: 2 }}>Daily Schedule</Typography>
        <CiSettings size={30} onClick={()=> setShowSetHours(!showSethours)} />
      </Stack>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="select-day-label">Select Day</InputLabel>
        <Select
          labelId="select-day-label"
          id="select-day"
          value={selectedDate.toISOString()}
          onChange={handleDateChange}
          label="Select Day"
        >
          {[...Array(7)].map((_, index) => {
            const dateOption = addHours(startOfDay(new Date()), index * 24);
            return (
              <MenuItem key={index} value={dateOption.toISOString()}>
                {format(dateOption, 'EEEE, MMMM do yyyy')}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {showSethours && (
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Set Hours</Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              label="Sleep Start"
              type="number"
              value={sleepStart}
              onChange={handleTimeChange(setSleepStart)}
              inputProps={{ min: 0, max: 23 }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Sleep End"
              type="number"
              value={sleepEnd}
              onChange={handleTimeChange(setSleepEnd)}
              inputProps={{ min: 0, max: 23 }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Work Start"
              type="number"
              value={workStart}
              onChange={handleTimeChange(setWorkStart)}
              inputProps={{ min: 0, max: 23 }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Work End"
              type="number"
              value={workEnd}
              onChange={handleTimeChange(setWorkEnd)}
              inputProps={{ min: 0, max: 23 }}
            />
          </Grid>
        </Grid>
      </Box>
    )}
      <Accordion expanded={expanded === 'sleep'} onChange={handleChange('sleep')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Sleep Hours</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {renderHourlySchedule(sleepStart, sleepEnd)}
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'work'} onChange={handleChange('work')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Work Hours</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {renderHourlySchedule(workStart, workEnd)}
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'afterwork'} onChange={handleChange('afterwork')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>After Work Hours</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {renderHourlySchedule(workEnd, sleepStart)}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default DailySchedule;


