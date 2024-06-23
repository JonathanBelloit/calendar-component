import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { addEvent } from "../../redux/eventSlice";

const EventDialog = ({
  showEventDialog,
  setShowEventDialog,
  userEmail,
  targetDate,
}: {
  showEventDialog: boolean;
  setShowEventDialog: (showEventDialog: boolean) => void;
  userEmail: string;
  targetDate: Date;
}) => {
  const dispatch = useAppDispatch();

  const [eventTitle, setEventTitle] = useState("");
  const [morningOrAfternoon, setMorningOrAfternoon] = useState("am");
  const [eventDescription, setEventDescription] = useState("");
  const [eventHour, setEventHour] = useState("");
  const [eventMinute, setEventMinute] = useState("");

  const handleAddEvent = () => {
    // const eventDate = new Date(currentYear, currentMonth, targetDay)
    if (userEmail && targetDate) {
      const timeString = `${eventHour.padStart(2, "0")}:${eventMinute.padStart(
        2,
        "0"
      )} ${morningOrAfternoon.toUpperCase()}`;
      dispatch(
        addEvent({
          userEmail,
          event: {
            title: eventTitle,
            description: eventDescription,
            date: targetDate,
            dateString: targetDate.toDateString(),
            time: timeString,
            user: userEmail,
          },
        })
      );
      setEventTitle("");
      setEventDescription("");
      setEventMinute("");
      setEventHour("");
    }
    setShowEventDialog(false);
  };

  return (
    <Dialog open={showEventDialog} onClose={() => setShowEventDialog(false)}>
      <DialogTitle
        sx={{
          textAlign: "center",
          color: "white",
          mb: 4,
          backgroundColor: "rgba(42,82,120,1.00)",
        }}
      >
        Add New Event
      </DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", p: 5, gap: 2 }}
      >
        <TextField
          label="Event Name"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
        />
        <Stack direction="row">
          <TextField
            type="number"
            label="Hour"
            value={eventHour}
            onChange={(e) => setEventHour(e.target.value)}
            inputProps={{ min: 1, max: 12 }}
            sx={{ maxWidth: "5rem" }}
          />
          <Typography variant="h4">:</Typography>
          <TextField
            type="number"
            label="min"
            value={eventMinute}
            onChange={(e) => setEventMinute(e.target.value)}
            inputProps={{ min: 0, max: 59 }}
            sx={{ maxWidth: "5rem" }}
          />
          <ToggleButtonGroup
            value={morningOrAfternoon}
            exclusive
            onChange={(_e, newValue) => setMorningOrAfternoon(newValue)}
          >
            <ToggleButton value="am">AM</ToggleButton>
            <ToggleButton value="pm">PM</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        <TextField
          fullWidth
          multiline
          rows={5}
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          label="Event Description"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddEvent}>Add Event</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventDialog;
