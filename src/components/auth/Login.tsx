import { useState } from "react";
import StyledInput from "../../styledComponents/StyledInput";
import { Box, Button } from "@mui/material";
import { auth, signInWithEmailAndPassword } from "../../config/firebase";
import { FaEye } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHidden, setPasswordHidden] = useState<boolean>(true);

  const handleLogin = async () => {
    if (email === "" || password === "") {
      alert("Please fill in all fields");
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={containerStyle}>
      <StyledInput
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <Box sx={{ position:'relative', display: 'flex', alignItems: 'center', width: '100%' }}>
        <StyledInput
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          type={passwordHidden ? "password" : "text"}
          sx={{ zIndex: 1 }}
          />
        <FaEye onClick={() => setPasswordHidden(!passwordHidden)} style={{ cursor: "pointer", position: 'absolute', right: 10, color: '#7493A2', zIndex: 2, fontSize: '1.5rem' }} />
      </Box>
      <Button onClick={handleLogin} variant="contained" color="primary" sx={{ paddingX: 10 }}>
        submit
      </Button>
    </div>
  );
};

const containerStyle = {
  // border: '1px solid white',
  display: "flex",
  flexDirection: "column",
  padding: "20px",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  flexGrow: 1,
  backgroundColor: "#7493A2",
  color: "white",
  gap: 10,
  // fontSize: '1.5rem',
  fontWeight: "bold",
  fontFamily: "Arial",
  fontStyle: "italic",
  letterSpacing: "2px",
  textShadow: "0px 0px 10px rgba(0,0,0,0.2)",
  boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
} as const;

export default Login;
