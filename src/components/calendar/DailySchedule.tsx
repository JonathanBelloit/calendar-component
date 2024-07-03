import { useEffect, useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Box, Typography, Grid, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getCurrentUserEmail } from "../../hooks/useCurrentUserEmail";
import { fetchEvents, selectEvents } from "../../redux/eventSlice";
import { fetchSchedule, selectSchedule, updateScheduleItem } from "../../redux/scheduleSlice";
import { useSelector } from "react-redux";
import { formatISO, startOfDay, addHours, format } from 'date-fns';

const DailySchedule = () => {
  const dispatch = useAppDispatch();
  const userEmail = getCurrentUserEmail();
  const events = useSelector(selectEvents);
  const schedule = useSelector(selectSchedule);

  const [expanded, setExpanded] = useState<string | false>(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

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

  const renderHourlySchedule = () => {
    const hours = Array.from({ length: 24 }, (_, i) => {
      const hourStart = addHours(startOfDay(selectedDate), i);
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

  return (
    <Box sx={{ p: 3, backgroundColor: 'white', borderRadius: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Daily Schedule</Typography>
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
      <Accordion expanded={expanded === 'sleep'} onChange={handleChange('sleep')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Sleep Hours</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {renderHourlySchedule()} {/* Update this as needed to show sleep hours */}
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'work'} onChange={handleChange('work')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Work Hours</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {renderHourlySchedule()} {/* Update this as needed to show work hours */}
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'afterwork'} onChange={handleChange('afterwork')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>After Work Hours</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {renderHourlySchedule()} {/* Update this as needed to show after work hours */}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default DailySchedule;
