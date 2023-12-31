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
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";

import { FaUser, FaLock } from "react-icons/fa";
import eatingSushi from "../assets/eatingsushi.svg";

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/UseUser";
import { storeTokenInLocalStorage } from "../hooks/common";
import * as Constants from "../constants";

function Signin() {
  const navigate = useNavigate();
  const { user, authenticated } = useUser();
  if (user || authenticated) {
    navigate("/home");
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [credentialsError, setCredentialsError] = useState("");

  const signInMethod = async () => {
    try {
      setIsLoading(true);
      const response = await axios({
        method: "POST",
        url: `${Constants.SERVER_URL}/log-in`,
        data: {
          username,
          password,
        },
      });

      if (!response.data.fulfilled) {
        setCredentialsError("");

        if (response.data.field == "username-password") {
          setCredentialsError(response.data.message);
        }
      }

      if (!response.data.token) {
        console.log("Something went wrong during sign in: ", response);
        return;
      }

      storeTokenInLocalStorage(response.data.token);
      navigate("/home");
    } catch (err) {
      console.log("Some error occured during signing in: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  const signInAsGuest = async () => {
    try {
      setIsLoading(true);
      const response = await axios({
        method: "POST",
        url: `${Constants.SERVER_URL}/log-in`,
        data: {
          username: "Guest",
          password: "password",
        },
      });

      if (!response.data.fulfilled) {
        setCredentialsError("");

        if (response.data.field == "username-password") {
          setCredentialsError(response.data.message);
        }
      }

      if (!response.data.token) {
        console.log("Something went wrong during sign in: ", response);
        return;
      }

      storeTokenInLocalStorage(response.data.token);
      navigate("/home");
    } catch (err) {
      console.log("Some error occured during signing in: ", err);
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
              src={eatingSushi}
              draggable={"false"}
              userSelect={"none"}
              boxSize={"480px"}
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
          p={{ base: 4, md: 32, xl: 48 }}
          pt={{ base: 12, xl: "4vh" }}
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
            <FormControl isInvalid={credentialsError != ""} bg={"white"}>
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
                  onChange={(e) => setUsername(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl isInvalid={credentialsError != ""} bg={"white"}>
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
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
              <FormErrorMessage pl={1} mb={-4}>
                {credentialsError}
              </FormErrorMessage>
            </FormControl>

            <Button
              size={"lg"}
              colorScheme="blue"
              width={"100%"}
              mt={{ base: 10, xl: 16 }}
              isLoading={isLoading}
              onClick={signInMethod}
            >
              Login
            </Button>
            <Link color={"blue.400"} onClick={signInAsGuest}>Log-in as a Guest</Link>
            <Link color={"blue.400"} href={"/sign-up/"}>
              Create new account
            </Link>
          </Flex>
        </Flex>
      </Grid>
    </>
  );
}

export default Signin;
