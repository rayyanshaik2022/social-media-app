import { Flex } from "@chakra-ui/react";

import NewPost from "./NewPost";
import Post from "./Post";

function Feed(props) {
  return (
    <>
      <Flex
        flexDir={"column"}
        bg={"gray.50"}
        minH={"calc(100vh - 110px)"}
        boxShadow={"2xl"}
        padding={{ base: 2, sm: 10 }}
        zIndex={2}
        gap={8}
      >
        <NewPost displayName={props.displayName} />
        <Post />
        <Post />
        <Post />
        <Post />
      </Flex>
    </>
  );
}

export default Feed;
