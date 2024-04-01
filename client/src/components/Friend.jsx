import { useTheme } from '@emotion/react';
import { PersonAddAlt1Outlined, PersonRemoveOutlined } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFriends, setPost, setPosts } from '../redux/slice';
import FlexBetween from "./FlexBetween";
import UserImage from './UserImage';
import { useNavigate } from 'react-router-dom';



const Friend = ({friendId, name, subtitle, userPicturePath }) => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state)=> state.user);
    const token = useSelector((state)=> state.token);
    const friends = useSelector((state)=> state.user.friends);

    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    const isFriend = friends.find((friend)=> friend._id === friendId);

    const patchFriend = async()=>{
        try {
            const response = await fetch(`http://localhost:3001/users/${_id}/${friendId}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })

            const data = await response.json();
            console.log(data);
            dispatch(setFriends({friends: data}))

        } catch (error) {
            console.log(error.message)
        }
    }
  return (
    <FlexBetween>
      <FlexBetween gap={"1rem"}> 
        <UserImage image={userPicturePath} size="55px"/>
        <Box onClick={()=>{
            navigate(`/profile/${friendId}`);
            navigate(0)
        }}>
          <Typography color={main} variant='h5' fontWeight={"500"} sx={{"&:hover": {color: palette.primary.light, cursor: "pointer"}}} >
            {name}
          </Typography>
          <Typography color={medium} fontSize={"0.75rem"}>
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton onClick={()=> patchFriend()} sx={{backgroundColor: primaryLight, p: "0.6rem", }}>
    { isFriend ? (
<PersonRemoveOutlined sx={{color: primaryDark}} />
    
    ) : (

        <PersonAddAlt1Outlined sx={{color: primaryDark}}  />
    )}
      </IconButton>
    </FlexBetween>
  )
}

export default Friend
