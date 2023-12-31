import { Flex, Box } from "@chakra-ui/react";

import NewPost from "./NewPost";
import Post from "./Post";

import axios from "axios";
import { useEffect, useState } from "react";

import * as Constants from "../constants";

function Feed(props) {
  const [currentPosts, setCurrentPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      const response = await axios({
        method: "GET",
        url: `${Constants.SERVER_URL}/posts/`,
        data: {},
      });

      setCurrentPosts(response.data.posts);
    }

    setLoading(true);
    getData();
    setLoading(false);

    return () => {};
  }, []);


  if (loading) {
    return (
      <><p>Loading</p></>
    )
  }
  return (
    <>
      <Flex
        flexDir={"column"}
        bg={"gray.50"}
        minH={{base: "calc(100vh - 70px)", lg: "calc(100vh - 110px)"}}
        boxShadow={"2xl"}
        padding={{ base: 2, sm: 10 }}
        zIndex={2}
        gap={8}
      >
        <NewPost displayName={props.displayName} setCurrentPosts={setCurrentPosts} currentPosts={currentPosts} />
        {currentPosts.map(post => (
          <Post key={post._id} {...post} />
        ))}
        <Box h={"16vh"}></Box>
      </Flex>
    </>
  );
}

export default Feed;
