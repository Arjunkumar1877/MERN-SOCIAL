import { useTheme } from "@emotion/react"
import { Box, Divider, Typography } from "@mui/material"
import FlexBetween from "../../components/FlexBetween"
import WidgetWrapper from "../../components/WidgetWrapper"
import { EditOutlined, LocationCityOutlined, WorkOutlineOutlined, ManageAccountsOutlined, LocationOnOutlined } from "@mui/icons-material"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import twitterImg from '../../assets/twitter.png'
import linkedinImg from "../../assets/linkedin.png"
import UserImage from "../../components/UserImage"



const UserWidgets = ({userId, picturePath}) => {
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state)=> state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;


    const getUser = async () => {
        try {
            const res = await fetch(`http://localhost:3001/user/${userId}`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
    
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
    
            const data = await res.json();
            console.log(data);
    
            setUser(data);
        } catch (error) {
            console.log(error.message);
        }
    };
    
    useEffect(()=>{
        getUser();
    }, []);

    if(!user){
        return null;
    }
    const { firstName, lastName, location, occupation, viewedProfile, impressions, friends} = user;
    console.log(user)
  return (
   <WidgetWrapper>
    <FlexBetween gap="0.5rem" pb={"1.1rem"} onClick={()=> navigate(`/profile/${userId}`)}>
        <FlexBetween gap={"1rem"} >
            <UserImage image={picturePath}  />
            <Box>
                <Typography variant="h4" color={dark} fontWeight={"500"} sx={{"&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer"
                }}}>
        {firstName}  {lastName}
                </Typography>
                <Typography color={medium}>{friends.length} friends</Typography>
            </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
        </FlexBetween>

        <Divider />


        <Box p={"1rem 0"}>
            <Box display={"flex"} alignItems={"center"} gap={"1rem"} mb={"0.5rem"} >
           <LocationOnOutlined fontSize="large" sx={{color: main}} />
           <Typography color={medium}>{location}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
        </Box>


        <Box p={"1rem 0"}>
       <FlexBetween mb={"0.5rem"}>
        <Typography color={medium}>
            Who's viewed your profile
        </Typography>
        <Typography color={main} fontWeight={"500"}>
            {viewedProfile}
        </Typography>
       </FlexBetween>

       <FlexBetween mb={"0.5rem"}>
        <Typography color={medium}>
            Impression's of your post
        </Typography>
        <Typography color={main} fontWeight={"500"}>
            {impressions}
        </Typography>
       </FlexBetween>
        </Box>


        <Box p={"1rem 0"}>
            <Typography fontSize={"1rem"} color={main} fontWeight={"500"} mb={"1rem"}>
                Social Profiles
            </Typography>

            <FlexBetween gap={"1rem"} mb={"0.5rem"}>
                <FlexBetween gap={"1rem"}>
                    <img src={twitterImg}  alt="twitter"/>
                    <Box>
                        <Typography color={main} fontWeight={"500"}>
                            Twitter
                        </Typography>
                        <Typography color={medium}>
                            Social Network
                        </Typography>
                    </Box>
                </FlexBetween>
                <EditOutlined sx={{color: main}} />
            </FlexBetween>

            <FlexBetween gap={"1rem"} >
                <FlexBetween gap={"1rem"}>
                    <img src={linkedinImg}  alt="linkedin"/>
                    <Box>
                        <Typography color={main} fontWeight={"500"}>
                            Linkedin
                        </Typography>
                        <Typography color={medium}>
                         Network Platform
                        </Typography>
                    </Box>
                </FlexBetween>
                <EditOutlined sx={{color: main}} />
            </FlexBetween>


        </Box>
   
   </WidgetWrapper>
  )
}

export default UserWidgets
