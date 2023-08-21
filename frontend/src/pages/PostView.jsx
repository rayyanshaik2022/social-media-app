import { Box, Flex } from "@chakra-ui/react";

import Navbar from "../components/Navbar";
import NavbarAnonymous from "../components/NavBarAnonymous";
import Post from "../components/Post";

import { useUserAnonymous } from "../hooks/UseUserAnonymous";
import { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";

function PostView() {
  const { user, authenticated } = useUserAnonymous();
  const [currentPost, setCurrentPost] = useState({});
  const [loading, setLoading] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    async function getData() {
      const response = await axios({
        method: "GET",
        url: `http://localhost:3000/posts/single/${id}`,
        data: {
        },
      });
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
            {!loading ? <Post key={currentPost._id} {...currentPost} user={user} /> : null}
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default PostView;
