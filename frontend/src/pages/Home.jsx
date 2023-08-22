import { Flex, Box, Grid } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import SideBar from "../components/Sidebar";
import Feed from "../components/Feed";
import RightFeed from "../components/RightFeed";

import { useMediaQuery } from "@chakra-ui/react";
import { useUser } from "../hooks/UseUser";

function Home() {
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
  const { user, authenticated } = useUser();
  
  if (!authenticated) {
    return (
      <></>
    )
  }

  return (
    <>
      <Box w={"100vw"} h={"100vh"} overflowX={"hidden"} overscrollBehaviorY={"none"}>
        <Flex flexDir={"column"}>
          <Navbar displayName={user.displayName} auth={true} />
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
            <Feed displayName={user.displayName} />
            {isLargerThan1280 ? <RightFeed /> : null}
          </Grid>
        </Flex>
      </Box>
    </>
  );
}

export default Home;
