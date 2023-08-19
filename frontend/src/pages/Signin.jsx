import {
  Flex,
  Grid,
  Image,
  Text,
  Heading,
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Button
} from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";
import { FaUser, FaLock } from "react-icons/fa";
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
          p={{base: 4, md: 32 ,xl: 48}}
          pt={{base: 12, xl: 24}}
          gap={12}
          whiteSpace={"nowrap"}
        >
          <Box boxSize={24} bg={"blue.700"} borderRadius={8}></Box>
          <Flex flexDir={"column"} alignItems={"center"} gap={2}>
            <Heading as={"h1"} fontWeight={"500"} fontSize={"5xl"}>
              Welcome back!
            </Heading>
            <Heading
              as={"h2"}
              fontWeight={"400"}
              fontSize={"xl"}
              color={"gray.500"}
            >
              Log-in to browse your favorite content
            </Heading>
          </Flex>
          <Flex flexDir={"column"} alignItems={"center"} gap={6} w={"100%"}>
            <InputGroup w={"100%"} bg={"gray.50"}>
              <InputRightElement pointerEvents="none" mt={2} mr={2}>
                <Icon as={FaUser} color="gray.300" boxSize={6} />
              </InputRightElement>
              <Input
                type="text"
                placeholder="Username"
                color={"gray.600"}
                h={14}
                fontSize={"17px"}
              />
            </InputGroup>
            <InputGroup w={"100%"} bg={"gray.50"}>
              <InputRightElement pointerEvents="none" mt={2} mr={2}>
                <Icon as={FaLock} color="gray.300" boxSize={6} />
              </InputRightElement>
              <Input
                type="password"
                placeholder="Password"
                color={"gray.600"}
                h={14}
                fontSize={"17px"}
              />
            </InputGroup>
            <Button size={"lg"} colorScheme="blue" width={"100%"} mt={{base: 10, xl: 16}}>Login</Button>
          </Flex>
        </Flex>
      </Grid>
    </>
  );
}

export default Signin;
