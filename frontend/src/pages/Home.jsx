import { Flex, Box, Grid } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import SideBar from "../components/Sidebar";
import Feed from "../components/Feed";
import RightFeed from "../components/RightFeed";

import { useMediaQuery } from "@chakra-ui/react";

function Home() {
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");

  return (
    <>
      <Box w={"100vw"} h={"100vh"}>
        <Flex flexDir={"column"}>
          <Navbar />
          <Grid
            w={"100%"}
            bg={"red"}
            gridTemplateColumns={{
              base: "0px 1fr 0px",
              md: "200px 1fr 0px",
              xl: "200px 1fr 400px",
            }}
          >
            <SideBar />
            <Feed />
            {
                isLargerThan1280 ? <RightFeed /> : null
            }
            
          </Grid>
        </Flex>
      </Box>
    </>
  );
}

export default Home;
