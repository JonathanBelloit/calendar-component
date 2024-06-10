import {useState} from 'react'
import { Box, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import EventList from './EventList'
import DailySchedule from './DailySchedule'

const InfoPanel = () => {
  const [infoDisplay, setInfoDisplay] = useState('events')

  const handleChange = (
    event: React.MouseEvent,
    newInfoDisplay: string,
  ) => {
    setInfoDisplay(newInfoDisplay)
  }
  
  const control = {
    value: infoDisplay,
    onChange: handleChange,
    exclusive: true
  }

  return (
    <>
      <Box sx={{ borderBottom: '2px solid black', pb: 1}}>
        <Stack spacing={2} alignItems='center'>
          <ToggleButtonGroup size='large' {...control} aria-label='events or schedule view'>
            <ToggleButton value='events' key='events'>
              <Typography variant='h6'>Events</Typography>
            </ToggleButton>
            <ToggleButton value='schedule' key='schedule'>
              <Typography variant='h6'>Schedule</Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Box>
      <Box>
        { infoDisplay === 'events' && <EventList />}
        { infoDisplay === 'schedule' && <DailySchedule />}
      </Box>
    </>
  )
}

export default InfoPanel