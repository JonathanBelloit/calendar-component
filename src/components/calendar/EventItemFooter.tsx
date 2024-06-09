import { Box, Button } from '@mui/material'
import React from 'react'
import { deleteEvent } from '../../redux/eventSlice'
import { useAppDispatch } from '../../hooks/useAppDispatch'

const EventItemFooter = ({ userEmail, eventId }:{userEmail: string, eventId: string}) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteEvent({userEmail, eventId}))
  }

  return (
    <Box sx={{ borderTop: '1px solid black', display: 'flex', justifyContent: 'space-between', pt: 1 }}>
      <Button variant="contained">Add to TodoList</Button>
      <Button variant="contained">Edit Event</Button>
      <Button variant="contained" color="error" onClick={handleDelete}>Delete Event</Button>
    </Box>
  )
}

export default EventItemFooter