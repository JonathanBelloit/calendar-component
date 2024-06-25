import { Modal, Box, Typography } from '@mui/material';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { fetchUserData, selectUserData, updateUser } from '../../redux/userSlice';
import { useEffect, useState } from 'react';


const CalendarSettings = ({
  calendarSettingsOpen,
  setCalendarSettingsOpen,
  userEmail,
}: {
  calendarSettingsOpen: boolean;
  setCalendarSettingsOpen: (open: boolean) => void;
  userEmail: string;
}) => {
  const dispatch = useAppDispatch();
  const userData = useSelector(selectUserData);
  const [color, setColor] = useState("");

  useEffect(() => {
    if (userEmail) {
      dispatch(fetchUserData({ userEmail: userEmail }));
    }
  }, [dispatch, userEmail]);

  const handleClose = () => setCalendarSettingsOpen(false);

  return (
    <>
      <Modal
        open={calendarSettingsOpen}
        onClose={handleClose}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            width: "40vw",
            height: "40vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>Calendar Shared with: </Typography>
          {(userData?.sharingAllowed?.length || 0) > 0 ? (
            userData?.sharingAllowed?.map((email: string) => (
              <Typography key={email}>{email}</Typography>
            ))
          ) : (
            <Typography>Not Sharing with any other users</Typography>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default CalendarSettings