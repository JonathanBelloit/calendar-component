import { Button, Modal, Box, Typography, TextField } from '@mui/material';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { fetchUserData, selectUserData, addUserData } from '../../redux/userSlice';
import { useEffect, useState } from 'react';

const ShareCalendarModal = ({
  shareCalendarModalOpen,
  setShareCalendarModalOpen,
  userEmail,
}: {
  shareCalendarModalOpen: boolean;
  setShareCalendarModalOpen: (open: boolean) => void;
  userEmail: string;
}) => {
  const dispatch = useAppDispatch();
  const userData = useSelector(selectUserData);

  const [newData, setNewData] = useState({
    firstName: userData?.firstName || "",
    lastName: userData?.lastName || "",
    sharingAllowed: userData?.sharingAllowed || [],
  });

  const handleClose = () => setShareCalendarModalOpen(false);

  useEffect(() => {
    if (userEmail) {
      dispatch(fetchUserData({ userEmail: userEmail }));
    }
  }, [dispatch, userEmail]);

  return (
    <>
      <Modal
        open={shareCalendarModalOpen}
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
          <Box>
            <TextField label="User Email" />
            <Button>Add User</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ShareCalendarModal