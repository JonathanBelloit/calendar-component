import { Box, Paper, Typography } from '@mui/material'
import { useState } from 'react'
import { formatDate } from '../../utils/dateUtils';

const EventItem = ({ event }: { event: { id?: string; title: string; date: string; time: string; description: string;} }) => {
  console.log(event)
  const [showDetails, setShowDetails] = useState(false)
  return (
    <Box sx={boxStyle} key={event.id} onClick={() => setShowDetails(true)}>
      { !showDetails && (
        <Typography variant="h5">
          {event.title}
        </Typography>
        )
      }
      { showDetails && (
        <Box>
          <Typography variant='h5'>{event.title}</Typography>
          <Typography variant='h5'>{formatDate(event.date)}</Typography>
          <Typography variant='h5'>{event.time}</Typography>
          <Box>
            <Paper sx={{ mx: 5 }}>
              {event.description}
            </Paper>
          </Box>
          <Typography variant='h5'>{event.description}</Typography>
        </Box>
      )}
    </Box>
  );
};

const boxStyle = {
  width: '100%',
  backgroundColor: '#3552A0',
  borderRadius: 3,
  p: 1,
  mb: 1,
  '&:hover': {
    backgroundColor: 'green'
  }
}

export default EventItem