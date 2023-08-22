import {
  Avatar,
  Flex,
  Heading,
  Text,
  Grid,
  Spacer,
  Button,
  Input,
} from "@chakra-ui/react";
import { UnlockIcon, LockIcon } from "@chakra-ui/icons";

import Navbar from "../components/Navbar";

import { useUser } from "../hooks/UseUser";
import { useEffect, useState } from "react";
import axios from "axios";
import { getTokenFromLocalStorage } from "../hooks/common";

function Profile() {
  const { user, authenticated } = useUser("/profile");
  const [editInput, setEditInput] = useState(false);

  const [inputDisplayName, setInputDisplayName] = useState("");
  const [inputLocation, setInputLocation] = useState("");

  const onClickEditInput = async () => {
    
    // when click is to LOCK
    if (editInput) {
      const token = getTokenFromLocalStorage();
      const response = await axios({
        method: "POST",
        url: `http://localhost:3000/users/${user._id}/profile`,
        data: {
          newDisplayName: inputDisplayName,
          newLocation: inputLocation
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.data.fulfilled) {
        setEditInput(!editInput);
        window.location.reload();
      } 
    } else {
      setEditInput(!editInput);
    }
    
  };

  const onChangeDisplayName = (e) => {
    setInputDisplayName(e.target.value);
  };

  const onChangeLocation = (e) => {
    setInputLocation(e.target.value);
  };

  useEffect(() => {
    async function getData() {
      try {
        setInputDisplayName(user.displayName);
        setInputLocation(user.location);
      } catch {
        null;
      }
    }
    getData();
  }, [user]);

  if (!authenticated) {
    return <></>;
  }

  return (
    <>
      <Navbar displayName={user.displayName} auth={true} />
      <Flex
        px={{ base: "20px", md: "100px", lg: "200px", xl: "300px" }}
        py={"60px"}
        flexDir={"column"}
        gap={6}
      >
        <Heading as={"h1"} fontSize={40} fontWeight={500}>
          My Profile
        </Heading>
        <Flex
          w={"100%"}
          h={"100%"}
          bg={"white"}
          borderRadius={10}
          p={6}
          flexDir={"column"}
          gap={6}
        >
          <Flex
            border={"1px"}
            borderColor={"gray.100"}
            borderRadius={10}
            p={4}
            w={"100%"}
            gap={4}
            alignItems={"center"}
            flexDir={{ base: "column", md: "row" }}
          >
            <Avatar
              name={user.displayName}
              w={{ base: "60px", sm: "80px" }}
              h={{ base: "60px", sm: "80px" }}
            />
            <Flex flexDir={"column"}>
              <Input
                placeholder="Display name"
                value={inputDisplayName}
                size="sm"
                p={editInput ? 1 : 0}
                fontSize={18}
                fontWeight={600}
                color={"black"}
                border={editInput ? "1px solid" : "none"}
                borderColor={"gray.400"}
                borderRadius={6}
                readOnly={!editInput}
                onChange={onChangeDisplayName}
              />
              <Text fontSize={16} color={"gray.500"}>
                @{user.username}
              </Text>
              <Input
                placeholder="Your location"
                value={inputLocation}
                size="sm"
                fontSize={16}
                color={"gray.500"}
                p={editInput ? 1 : 0}
                border={editInput ? "1px solid" : "none"}
                borderColor={"gray.400"}
                borderRadius={6}
                readOnly={!editInput}
                onChange={onChangeLocation}
              />
            </Flex>
            <Spacer />
            <Button
              rightIcon={editInput ? <UnlockIcon /> : <LockIcon />}
              colorScheme="gray"
              variant="outline"
              borderRadius={"40px"}
              size={{ base: "md", md: "lg" }}
              onClick={onClickEditInput}
            >
              Edit
            </Button>
          </Flex>

          <Flex
            border={"1px"}
            borderColor={"gray.100"}
            borderRadius={10}
            p={4}
            w={"100%"}
            gap={4}
            flexDir={"column"}
          >
            <Flex>
              <Heading as={"h2"} fontSize={18}>
                Profile Summary
              </Heading>
            </Flex>
            <Grid templateColumns={"1fr 1fr"} gap={6}>
              <Flex flexDir={"column"}>
                <Text fontWeight={500} color={"gray.500"}>
                  Total Posts
                </Text>
                <Text>{user.posts.length}</Text>
              </Flex>
              {/* <Flex flexDir={"column"}>
                    <Text fontWeight={500} color={"gray.500"}>Total Likes</Text>
                    <Text>123</Text>
                </Flex> */}
              <Flex flexDir={"column"}>
                <Text fontWeight={500} color={"gray.500"}>
                  Posts Liked
                </Text>
                <Text>{user.liked.length}</Text>
              </Flex>
            </Grid>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default Profile;
