import {
  Avatar,
  Flex,
  Heading,
  Text,
  Grid,
  Spacer,
  Box,
} from "@chakra-ui/react";

import Navbar from "../components/Navbar";
import NavbarAnonymous from "../components/NavBarAnonymous";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useUserAnonymous } from "../hooks/UseUserAnonymous";
import * as Constants from "../Constants";

function PublicProfile() {
  const { user, authenticated } = useUserAnonymous();
  let { username } = useParams();
  let [loading, setLoading] = useState(false);
  let [profileData, setProfileData] = useState({});

  useEffect(() => {
    async function getData() {
      const response = await axios({
        method: "GET",
        url: `${Constants.SERVER_URL}/users/profile/${username}`,
        data: {},
      });

      if (response.data.fulfilled) {
        setProfileData(response.data.profile);
      }
    }

    setLoading(true);
    getData();

    setLoading(false);
  }, []);

  if (loading) {
    return <>Loading</>;
  }

  return (
    <>
      <Box w={"100vw"} h={"100vh"} overflowX={"hidden"}>
        <Flex flexDir={"column"} alignItems={"center"}>
          {authenticated ? (
            <Navbar displayName={user.displayName} auth={true} />
          ) : (
            <NavbarAnonymous />
          )}
          <Flex
            px={{ base: "20px", md: "100px", lg: "200px", xl: "300px" }}
            py={"60px"}
            flexDir={"column"}
            gap={6}
            w={"100%"}
          >
            <Heading as={"h1"} fontSize={40} fontWeight={500}>
              {profileData.displayName + "'s Profile"}
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
                  name={profileData.displayName}
                  w={{ base: "60px", sm: "80px" }}
                  h={{ base: "60px", sm: "80px" }}
                />
                <Flex flexDir={"column"}>
                  <Heading fontSize={18} fontWeight={600}>
                    {profileData.username}
                  </Heading>
                  <Text fontSize={16} color={"gray.500"}>
                    @{profileData.username}
                  </Text>

                  <Text fontSize={16} color={"gray.500"}>
                    {profileData.location}
                  </Text>
                </Flex>
                <Spacer />
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
                    <Text>{profileData.totalPosts}</Text>
                  </Flex>
                  <Flex flexDir={"column"}>
                    <Text fontWeight={500} color={"gray.500"}>
                      Posts Liked
                    </Text>
                    <Text>{profileData.totalLiked}</Text>
                  </Flex>
                </Grid>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default PublicProfile;
