import { Flex } from "@chakra-ui/react";

import NewPost from "./NewPost";

function Feed() {
    return (
        <>
        <Flex flexDir={"column"} bg={"gray.50"} minH={"calc(100vh - 110px)"} boxShadow={"2xl"} padding={{base: 2, sm: 10}} zIndex={2}>
            <NewPost />
        </Flex>
        </>
    );
}

export default Feed;