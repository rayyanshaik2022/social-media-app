import {
  Flex,
  Grid,
  Image,
  Heading,
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Button,
  Link,
} from "@chakra-ui/react";

import { FaUser, FaLock } from "react-icons/fa";
import eatingBreakfast from "../assets/eatingbreakfast.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const signUpPost = async () => {
    try {
      setIsLoading(true);
      const response = await axios({
        method: "POST",
        url: "http://localhost:3000/sign-up/",
        data: {
          username,
          password,
        },
      });

      if (!response.data.token) {
        console.log("Something went wrong during sign up: ", response);
        return;
      }
      navigate("/sign-in/");
    } catch (err) {
      console.log("Some error occured during sign up: ", err);
    } finally {
      setIsLoading(false);
    }
  };

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
              src={eatingBreakfast}
              draggable={"false"}
              userSelect={"none"}
              boxSize={"630px"}
              bg={"#5880ca"}
              borderRadius={"5%"}
            />
          </Box>
          <Heading color={"gray.50"} size={"2xl"}>
            Read, Share, Enjoy
          </Heading>
        </Flex>

        <Flex
          h={"100vh"}
          bg={"white"}
          flexDir={"column"}
          alignItems={"center"}
          p={{ base: 4, md: 32, xl: 48 }}
          pt={{ base: 12, xl: 24 }}
          gap={12}
          whiteSpace={"nowrap"}
        >
          <Box boxSize={24} bg={"blue.700"} borderRadius={8}></Box>
          <Flex flexDir={"column"} alignItems={"center"} gap={2}>
            <Heading as={"h1"} fontWeight={"500"} fontSize={"5xl"}>
              {"Let's get started!"}
            </Heading>
            <Heading
              as={"h2"}
              fontWeight={"400"}
              fontSize={"xl"}
              color={"gray.500"}
            >
              Create an account
            </Heading>
          </Flex>
          <Flex flexDir={"column"} alignItems={"center"} gap={4} w={"100%"}>
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
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </InputGroup>
            <InputGroup w={"100%"} bg={"gray.50"} mt={6}>
              <InputRightElement pointerEvents="none" mt={2} mr={2}>
                <Icon as={FaLock} color="gray.300" boxSize={6} />
              </InputRightElement>
              <Input
                type="password"
                placeholder="Password"
                color={"gray.600"}
                h={14}
                fontSize={"17px"}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </InputGroup>
            <InputGroup w={"100%"} bg={"gray.50"}>
              <InputRightElement pointerEvents="none" mt={2} mr={2}>
                <Icon as={FaLock} color="gray.300" boxSize={6} />
              </InputRightElement>
              <Input
                type="password"
                placeholder="Confirm Password"
                color={"gray.600"}
                h={14}
                fontSize={"17px"}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </InputGroup>
            <Button
              size={"lg"}
              colorScheme="blue"
              width={"100%"}
              mt={{ base: 10, xl: 16 }}
              onClick={signUpPost}
              isLoading={isLoading}
            >
              Create Account
            </Button>
            <Link color={"blue.400"}>Log-in as a Guest</Link>
            <Link color={"blue.400"} href={"/sign-in/"}>Log in to existing account</Link>
          </Flex>
        </Flex>
      </Grid>
    </>
  );
}

export default Signup;
