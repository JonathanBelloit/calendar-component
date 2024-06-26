import { Box, FormControl, MenuItem, Select } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'

const ColorDropDown = ({ borderColor, setColor }: { borderColor: string, setColor: (color: string) => void }) => {
  

  const handleChange = (event: SelectChangeEvent) => {
    setColor(event.target.value as string)
  }

  return (
    <Box>
      <FormControl fullWidth>
        <Select
          value={borderColor}
          label="Color"
          onChange={handleChange}
          sx={{ backgroundColor: borderColor}}
        >
          <MenuItem dense={true} sx={{ color: 'red' }}value="red">Red</MenuItem>
          <MenuItem value="blue">Blue</MenuItem>
          <MenuItem value="purple">Purple</MenuItem>
          <MenuItem value="green">Green</MenuItem>
          <MenuItem value="orange">Orange</MenuItem>
          <MenuItem value="pink">Pink</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default ColorDropDown