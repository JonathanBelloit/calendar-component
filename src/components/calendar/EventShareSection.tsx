import { useState, useEffect } from 'react'
import { Grid, Box, Typography, Select, SelectChangeEvent, InputLabel, FormControl, MenuItem, Button } from '@mui/material'
import { useSelector } from 'react-redux';
import { fetchUserData, selectUserData } from "../../redux/userSlice";
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { getCurrentUserEmail } from '../../hooks/useCurrentUserEmail';

const EventShareSection = ({ user }: { user: string | undefined }) => {
  const [ shareTo, setShareTo ] = useState<string>("")
  const dispatch = useAppDispatch()
  const userData = useSelector(selectUserData)
  const userEmail = getCurrentUserEmail()
  const shareList = userData?.sharingAllowed || []

  useEffect(() => {
    if (userEmail) {
      dispatch(fetchUserData({userEmail}))
    }
  }, [dispatch, userEmail])

  const handleChange = (event: SelectChangeEvent) => {
    setShareTo(event.target.value as string)
  }

  return (
    <Grid container>
      <Grid item xs={5}>
        <Box>
          <Typography>Added by: {user || ""}</Typography>
        </Box>
      </Grid>
      <Grid item xs={7}>
        <Box>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="select-shared-user">Share with</InputLabel>
            <Select
            labelId="select-shared-user"
            id="select-user"
            value={shareTo}
            label="Share with"
            onChange={handleChange}
            >
              {shareList.map((email) => (
                <MenuItem value={email}>{email}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button>Share</Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default EventShareSection