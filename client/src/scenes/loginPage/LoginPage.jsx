// import { useTheme } from "@emotion/react"
import { Box, useTheme, Typography, useMediaQuery } from "@mui/material";
import Form from './Form'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LoginPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state)=> state.user)
  useEffect(()=>{
    if(user){
      navigate("/home")
    }
  },[])
  const theme = useTheme();
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px");
  return (
   <Box width="100%" backgroundColor={theme.palette.background.alt}  p="1rem 6%" textAlign="center" >
    <Typography 
    fontWeight="bold" 
    fontSize="32px"
    color="primary"
   >
    </Typography>

    <Box width={isNonMobileScreen ? "50%" : "93%"} p="2rem" m="2rem auto" borderRadius="1.5rem" backgroundColor={theme.palette.background.alt}>
      <Typography fontWeight="500" variant="h5" sx={{mb: "1.5rem"}}>
        Welcome to Social media App
      </Typography>
      <Form />
    </Box>
   </Box>
  )
}

export default LoginPage
