import { styled, TextField } from "@mui/material";

const styledInput = styled(TextField)({
  '& .MuiInputBase-root': {
    height: '4rem',
    borderRadius: '30px',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  '& .MuiInputBase-input': {
    padding: '0 1rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    fontFamily: 'Arial',
    fontStyle: 'italic',
    letterSpacing: '2px',
  },
  '& .MuiInputBase-input::placeholder': {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    fontFamily: 'Arial',
    fontStyle: 'italic',
    letterSpacing: '2px',
    color: 'rgba(0,0,0,0.5)',
  }
})
export default styledInput;