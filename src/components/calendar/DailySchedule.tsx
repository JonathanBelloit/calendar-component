import { useEffect, useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Box, Typography, Grid, Button } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getCurrentUserEmail } from "../../hooks/useCurrentUserEmail";
import { fetchEvents, selectEvents } from "../../redux/eventSlice";
import { fetchSchedule, selectSchedule, updateScheduleItem } from "../../redux/scheduleSlice";
import { useSelector } from "react-redux";
import { formatISO, startOfDay, addHours } from 'date-fns';

const DailySchedule = ({/*{ date }*/}) => {
  const dispatch = useAppDispatch();
  const userEmail = getCurrentUserEmail();
  const events = useSelector(selectEvents);
  const schedule = useSelector(selectSchedule);

  const [expanded, setExpanded] = useState<string | false>(false);

  // hard coding date for testing
  const date = new Date();
  // useEffect(() => {
  //   if (userEmail) {
  //     dispatch(fetchEvents(userEmail));
  //     dispatch(fetchSchedule({ userEmail, date: formatISO(date, { representation: 'date' }) }));
  //   }
  // }, [dispatch, userEmail, date]);

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  // const handleToggleAvailability = (item) => {
  //   dispatch(updateScheduleItem({ userEmail, item: { ...item, available: !item.available } }));
  // };

  const renderHourlySchedule = () => {
    const hours = Array.from({ length: 24 }, (_, i) => {
      const hourStart = addHours(startOfDay(date), i);
      // const scheduleItem = schedule.find(item => new Date(item.time).getHours() === hourStart.getHours());

      return (
        <Box key={i} sx={{ mb: 1, p: 1, border: '1px solid grey', borderRadius: 2 }}>
          <Typography variant="body1"><strong>{hourStart.getHours()}:00</strong></Typography>
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
