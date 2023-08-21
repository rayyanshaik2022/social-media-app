import { Box, Flex, Grid } from "@chakra-ui/react";

import Feed from "../components/Feed";
import RightFeed from "../components/RightFeed";
import Navbar from "../components/Navbar";
import NavbarAnonymous from "../components/NavBarAnonymous";
import Post from "../components/Post";

import { useMediaQuery } from "@chakra-ui/react";
import { getAuthenticatedUser } from "../hooks/common";
import { useUserAnonymous } from "../hooks/UseUserAnonymous";
import { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";

function PostView() {
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
  const { user, authenticated } = useUserAnonymous();
  const [currentPost, setCurrentPost] = useState({});
  const [loading, setLoading] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    async function getData() {
      const response = await axios({
        method: "GET",
        url: `http://localhost:3000/posts/single/${id}`,
        data: {},
      });

      console.log(response.data.post);
      setCurrentPost(response.data.post);
    }

    setLoading(true);
    getData();
    setLoading(false);

    return () => {};
  }, []);

  if (!authenticated) {
    return (
      <>
        <Box w={"100vw"} h={"100vh"} overflowX={"hidden"}>
          <Flex flexDir={"column"} alignItems={"center"}>
            <NavbarAnonymous />
            <Box w={"100%"} h={"100%"} p={"4%"} pt={"6%"} maxW={"1000px"}>
              {!loading ? (
                <Post key={currentPost._id} {...currentPost} />
              ) : null}
            </Box>
          </Flex>
        </Box>
      </>
    );
  }
  return (
    <>
      <Box w={"100vw"} h={"100vh"} overflowX={"hidden"}>
        <Flex flexDir={"column"} alignItems={"center"}>
          <Navbar displayName={user.displayName} auth={true} />
          <Box w={"100%"} h={"100%"} p={"4%"} pt={"6%"} maxW={"1000px"}>
            {!loading ? <Post key={currentPost._id} {...currentPost} /> : null}
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default PostView;
