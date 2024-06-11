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

  console.log(userData)
  return (
    <>
      <Modal open={profileModalOpen} onClose={handleClose}>
        <Box sx={{ backgroundColor: 'white'}}>
          <Box>
            <Typography>User Profile Modal</Typography>
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
          <Box>
            <Button onClick={handleAddData}>Submit</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default UserProfileModal