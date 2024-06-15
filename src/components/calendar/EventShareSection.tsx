import { useState, useEffect } from 'react'
import { Grid, Box, Typography, Select, SelectChangeEvent, InputLabel, FormControl, MenuItem, Button } from '@mui/material'
import { useSelector } from 'react-redux';
import { fetchUserData, selectUserData } from "../../redux/userSlice";
import { shareEvent } from '../../redux/eventSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { getCurrentUserEmail } from '../../hooks/useCurrentUserEmail';

const EventShareSection = ({ event } : {
  event: {
    id?: string;
    title: string;
    date: string;
    time: string;
    description: string;
    user?: string;
  }}) => {
  const [ shareTo, setShareTo ] = useState<string>("")
  const dispatch = useAppDispatch()
  const userData = useSelector(selectUserData)
  const userEmail = getCurrentUserEmail()
  const shareList = userData?.sharingAllowed || []

  console.log('this is the event: ', event)

  useEffect(() => {
    if (userEmail) {
      dispatch(fetchUserData({userEmail}))
    }
  }, [dispatch, userEmail])

  const handleChange = (event: SelectChangeEvent) => {
    setShareTo(event.target.value as string)
  }

  const handleShare = () => {
    if (shareTo) {
      dispatch(shareEvent({
        event: {
          id: event.id,
          title: event.title,
          date: event.date,
          dateString: event.date,
          time: event.time,
          description: event.description,
          user: event.user,
        },
        userEmail: shareTo
      }))
    }
  }

  return (
    <Grid container>
      <Grid item xs={5}>
        <Box>
          <Typography>Added by: {event.user || ""}</Typography>
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
          <Button variant='contained' onClick={handleShare}>Share</Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default EventShareSection