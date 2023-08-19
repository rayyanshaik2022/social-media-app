import { Flex, Grid, Image, Text, Heading, Box } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";

import eatingSushi from "../assets/eatingsushi.svg";

function Signin() {
  const [isLargerThan1000] = useMediaQuery("(min-width: 1000px)");

  return (
    <>
      <Grid templateColumns={{ base: "1fr", lg: "1fr 50vw" }}>
        <Flex
          h={"100vh"}
          bg={"#295fc2"}
          display={{ base: "none", lg: "flex" }}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={12}
        >
          <Box p={4}>
            <Image
              src={eatingSushi}
              draggable={"false"}
              userSelect={"none"}
              boxSize={"630px"}
              bg={"#5880ca"}
              borderRadius={"5%"}
            />
          </Box>
          <Heading color={"gray.50"} size={"2xl"}>
            Share what you love
          </Heading>
        </Flex>

        <Flex
          h={"100vh"}
          bg={"white"}
          flexDir={"column"}
          alignItems={"center"}
          p={32}
        >
          <Box boxSize={24} bg={"blue.700"} borderRadius={8}></Box>
          <Flex flexDir={"column"} alignItems={"center"}>
            <Heading as={"h1"}>Welcome back!</Heading>
            <Heading as={"h2"}>Log-in to browse your favorite content</Heading>
          </Flex>
        </Flex>
      </Grid>
    </>
  );
}

export default Signin;
