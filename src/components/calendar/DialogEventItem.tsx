import { Box, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { IoArrowDownCircleSharp } from "react-icons/io5";
import { IoArrowUpCircleSharp } from "react-icons/io5";

const DialogEventItem = ({ time, title, description }: { time: string, title: string, description: string }) => {
  const [showDescription, setShowDescription] = useState(false);
  return (
    <Box sx={{ border: '1px solid black'}}>
      <Stack direction="row">
        <Box sx={{ pr: 2}}>
          <Typography>{time}  -</Typography>
        </Box>
        <Box>
          <Typography>{title}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', ml: 'auto' }}>
          { !showDescription ? <IoArrowDownCircleSharp onClick={() => setShowDescription(!showDescription)} /> : <IoArrowUpCircleSharp onClick={() => setShowDescription(!showDescription)}/> }
        </Box>
      </Stack>
      {showDescription && <Box>
        <Typography>{description}</Typography>
      </Box>}
    </Box>
  )
}

export default DialogEventItem