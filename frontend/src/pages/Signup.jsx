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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text
} from "@chakra-ui/react";

import { storeTokenInLocalStorage } from "../hooks/common";
import { FaUser, FaLock } from "react-icons/fa";
import eatingBreakfast from "../assets/eatingbreakfast.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import * as Constants from "../constants";

function Signup() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const signUpPost = async () => {
    try {
      setIsLoading(true);
      const response = await axios({
        method: "POST",
        url: `${Constants.SERVER_URL}/sign-up/`,
        data: {
          username,
          password,
          confirmPassword
        },
      });

      if (!response.data.fulfilled) {

        setUsernameError("");
        setPasswordError("");
        setConfirmPasswordError("");

        if (response.data.field == "username") {
          setUsernameError(response.data.message);
        }
        else if (response.data.field == "password") {
          setPasswordError(response.data.message);
        }
        else if (response.data.field == "confirm-password") {
          setConfirmPasswordError(response.data.message);
        }
        return;
      }
      navigate("/sign-in/");
    } catch (err) {
      console.log("Some error occured during sign up: ", err);
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

      storeTokenInLocalStorage(response.data.token);
      navigate("/home");
    } catch (err) {
      console.log("Some error occured during signing in: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    onOpen();

  }, [])
  

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
              boxSize={"480px"}
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
          pt={{ base: 12, xl: "4vh" }}
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
              <FormControl isInvalid={usernameError != ""} bg={"white"}>
                <Input
                  type="text"
                  placeholder="Username"
                  color={"gray.600"}
                  h={14}
                  fontSize={"17px"}
                  bg={"gray.50"}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <FormErrorMessage pl={1} mb={-4}>
                  {usernameError}
                </FormErrorMessage>
              </FormControl>
            </InputGroup>

            <InputGroup w={"100%"} bg={"gray.50"} mt={6}>
              <InputRightElement pointerEvents="none" mt={2} mr={2}>
                <Icon as={FaLock} color="gray.300" boxSize={6} />
              </InputRightElement>
              <FormControl isInvalid={passwordError != ""} bg={"white"}>
                <Input
                  type="password"
                  placeholder="Password"
                  color={"gray.600"}
                  h={14}
                  fontSize={"17px"}
                  bg={"gray.50"}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <FormErrorMessage pl={1}>
                  {passwordError}
                </FormErrorMessage>
              </FormControl>
            </InputGroup>

            <InputGroup w={"100%"} bg={"gray.50"}>
              <InputRightElement pointerEvents="none" mt={2} mr={2}>
                <Icon as={FaLock} color="gray.300" boxSize={6} />
              </InputRightElement>
              <FormControl isInvalid={confirmPasswordError != ""} bg={"white"}>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  color={"gray.600"}
                  h={14}
                  fontSize={"17px"}
                  bg={"gray.50"}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
                <FormErrorMessage pl={1}>{confirmPasswordError}</FormErrorMessage>
              </FormControl>
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
            <Link color={"blue.400"} onClick={signInAsGuest}>Log-in as a Guest</Link>
            <Link color={"blue.400"} href={"/sign-in/"}>
              Log in to existing account
            </Link>
          </Flex>
        </Flex>
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent >
          <ModalHeader fontSize={24}>Website Disclaimer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={20}>[ <strong>!</strong> ] This website is intended to be used as a demo project for Rayyan Shaik's portfolio</Text>
            <br />
            <Text fontSize={20}>[ <strong>!</strong> ] Please wait about <strong>3 minutes</strong> for the server to startup. While the server is "asleep" log-in and home page functionality will not work</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Signup;
