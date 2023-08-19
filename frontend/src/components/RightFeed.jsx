import { Flex } from "@chakra-ui/react";

import SponsoredCard from "./SponsoredCard";

function RightFeed() {
  return (
    <Flex
      flexDir={"column"}
      bg={"gray.50"}
      minH={"calc(100vh - 110px)"}
      boxShadow={"2xl"}
      padding={10}
      zIndex={1}
    >
      <SponsoredCard />
    </Flex>
  );
}

export default RightFeed;
