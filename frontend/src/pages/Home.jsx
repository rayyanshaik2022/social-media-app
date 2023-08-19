import { Flex, Box, Grid } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import SideBar from "../components/Sidebar";
import Feed from "../components/Feed";
import RightFeed from "../components/RightFeed";

function Home() {

  return (
    <>
      <Box w={"100vw"} h={"100vh"}>
        <Flex flexDir={"column"}>
          <Navbar />
          <Grid w={"100%"} bg={"red"} gridTemplateColumns={"200px 1fr 440px"}>
            <SideBar />
            <Feed />
            <RightFeed />
          </Grid>
        </Flex>
      </Box>
    </>
  );
}

export default Home;
