import { Button, Modal, Box, Typography, TextField } from '@mui/material';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { fetchUserData, selectUserData, addUserData } from '../../redux/userSlice';
import { useEffect, useState } from 'react';


const UserProfileModal = ({
  profileModalOpen,
  setProfileModalOpen,
  userEmail,
}: {
  profileModalOpen: boolean;
  setProfileModalOpen: (open: boolean) => void;
  userEmail: string;
}) => {
  const dispatch = useAppDispatch();
  const userData = useSelector(selectUserData);

  const [newData, setNewData] = useState({
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    sharingAllowed: userData?.sharingAllowed || [''],
  })

  useEffect(() => {
    if (userEmail) {
      dispatch(fetchUserData({ userEmail: userEmail}))
    }
  }, [dispatch, userEmail])
  const handleClose = () => setProfileModalOpen(false);

  const handleAddData = () => {
    dispatch(addUserData({ userEmail, data: newData }));
  };

  return (
    <>
      <Modal open={profileModalOpen} onClose={handleClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', width: '40vw', height: '40vh'}}>
          <Box sx={{ borderBottom: '1px solid black' }}>
            <Typography>User Profile Modal</Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            { userData?.firstName ? (
              <Typography>{userData.firstName}</Typography>
            ) : (
              <TextField 
                label='Fist Name'
                value={newData.firstName}
                onChange={(e) => setNewData({ ...newData, firstName: e.target.value})}
              />
            )}
            { userData?.lastName ? (
              <Typography>{userData.lastName}</Typography>
            ) : (
              <TextField 
                label='Fist Name'
                value={newData.lastName}
                onChange={(e) => setNewData({ ...newData, lastName: e.target.value})}
              />
            )}

          </Box>
          <Box sx={{ borderTop: '1px solid black' }}>
            <Button onClick={handleAddData}>Submit</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default UserProfileModal