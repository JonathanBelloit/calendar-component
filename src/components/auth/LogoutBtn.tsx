// import { PiSignOut } from "react-icons/pi";
import { signOut, auth } from '../../config/firebase'
import { Button } from '@mui/material'

const LogoutBtn = () => {
  return (
    <Button onClick={() => signOut(auth)}>Sign Out</Button>
  )
}

export default LogoutBtn