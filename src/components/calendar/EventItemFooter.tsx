import { Box, Button } from '@mui/material'
import React from 'react'
import { deleteEvent } from '../../redux/eventSlice'
import { useAppDispatch } from '../../hooks/useAppDispatch'
// imports to directly add todo without using redux until components merged
import { db } from '../../config/firebase'
import { collection, addDoc } from 'firebase/firestore'

const EventItemFooter = ({
  event,
  setEventTrigger,
}: {
  event: {
    id?: string;
    title: string;
    date: string;
    time: string;
    description: string;
    user?: string;
  };
  setEventTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    if (event.user && event.id)
    dispatch(deleteEvent({userEmail: event.user, eventId: event.id}))
    setEventTrigger(true)
  }
  // function to add to todolist WILL CHANGE TO REDUX WHEN COMPONENTS MERGE
  const addTodo = async () => {
    try {
      const todosCollectionRef = collection(db, `users/${event.user}/todos`);
      const docRef = await addDoc(todosCollectionRef, {title: event.title, description: event.description})
      return {id: docRef.id}
    } catch(error) {
      console.log('error adding todo')
      alert('error adding todo')
    }
  }

  return (
    <Box sx={{ borderTop: '1px solid black', display: 'flex', justifyContent: 'space-between', pt: 1 }}>
      <Button variant="contained" onClick={addTodo}>Add to TodoList</Button>
      <Button variant="contained">Edit Event</Button>
      <Button variant="contained" color="error" onClick={handleDelete}>Delete Event</Button>
    </Box>
  )
}

export default EventItemFooter