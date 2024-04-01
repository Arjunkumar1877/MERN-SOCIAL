import { Box, useMediaQuery } from "@mui/material"
import Navbar from '../navbar/Navbar'
import { useSelector } from "react-redux";
import UserWidgets from "../../scenes/widgets/UserWidgets";
import MyPostWidget from "../../scenes/widgets/MyPostWidget";
import PostWidget from "../../scenes/widgets/PostsWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="1rem"
        // justifyContent=""
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidgets userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostWidget userId={_id} />
        </Box>
       
      </Box>
    </Box>
  );
};

export default HomePage