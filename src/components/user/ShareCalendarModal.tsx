import { Button, Modal, Box, Typography, TextField, Stack } from '@mui/material';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { fetchUserData, selectUserData, updateUser } from '../../redux/userSlice';
import { useEffect, useState } from 'react';
import ColorDropDown from './ColorDropDown';

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

  const [newEmail, setNewEmail] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    if (userEmail) {
      dispatch(fetchUserData({ userEmail: userEmail }));
    }
  }, [dispatch, userEmail]);

  const handleClose = () => setShareCalendarModalOpen(false);

  const handleAddEmail = () => {
    if (userData && newEmail) {
      const updatedUserData = {
        ...userData,
        sharingAllowed: [
          ...(userData.sharingAllowed || []),
          { email: newEmail, color },
        ],
      };
      dispatch(updateUser({ userEmail, user: updatedUserData }));
      setNewEmail("");
      setColor("");
    }
  };

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
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>Calendar Shared with: </Typography>
          {(userData?.sharingAllowed?.length || 0) > 0 ? (
            userData?.sharingAllowed?.map((user) => (
              <Stack direction="row" alignItems="center" spacing={2} key={user.email}>
                <Typography>{user.email}</Typography>
                <ColorDropDown
                  borderColor={user.color}
                  setColor={(color: string) => {
                    const updatedSharingAllowed = userData.sharingAllowed?.map((u) =>
                      u.email === user.email ? { ...u, color } : u
                    );
                    dispatch(updateUser({ userEmail, user: { ...userData, sharingAllowed: updatedSharingAllowed } }));
                  }}
                />
              </Stack>
            ))
          ) : (
            <Typography>Not Sharing with any other users</Typography>
          )}
          <Box sx={{ display: "flex", mt: 2 }}>
            <TextField
              label="User Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              sx={{ mr: 2 }}
            />
            <Button onClick={handleAddEmail}>Add User</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ShareCalendarModal;
