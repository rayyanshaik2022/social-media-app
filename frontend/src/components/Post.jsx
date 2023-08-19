import {
  Card,
  Flex,
  Avatar,
  Heading,
  Text,
  Divider,
  Icon,
  CardHeader,
  CardBody,
  Circle,
} from "@chakra-ui/react";

import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { LinkIcon } from "@chakra-ui/icons";

function Post() {
  return (
    <>
      <Card
        w={"100%"}
        boxShadow={
          " rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.10) 0px 0px 0px 1px"
        }
        p={3}
      >
        <Circle
          pos={"absolute"}
          right={4}
          size="36px"
          bg="white"
          color="white"
          _hover={{
            bg: "gray.200",
            cursor: "pointer",
          }}
        >
          <Icon as={FiMoreHorizontal} boxSize={8} color={"gray.400"} />
        </Circle>

        <CardHeader display={"flex"}>
          <Avatar
            name="Rayyan Shaik"
            w={16}
            h={16}
            src="https://bit.ly/dan-abramov"
            mr={4}
          />
          <Flex
            flexDir={"column"}
            alignItems={"left"}
            justifyContent={"center"}
            h={16}
          >
            <Heading fontSize={"lg"} color={"blue.700"}>
              Rayyan Shaik
            </Heading>
            <Text color={"gray.400"}>a minute ago</Text>
          </Flex>
        </CardHeader>

        <CardBody pt={0}>
          <Text fontSize={18}>
            Hello there this iHello there this is Hello there this is Hello
            there this is Hello there this is Hello there this is Hello there
            this is Hello there this is Hello there this is Hello there this is
            s test
          </Text>
        </CardBody>

        <Flex flexDir={"column"} p={2}>
          <Flex flexDir={"column"}>
            <Divider mt={2} />
            <Flex alignItems={"center"} mt={4} gap={8}>
              <Flex
                alignItems={"center"}
                gap={2}
                mt={2}
                _hover={{ cursor: "pointer" }}
              >
                <Icon as={AiOutlineHeart} boxSize={8} color={"red.400"} />
                <Text fontWeight={"600"} color={"gray.600"}>
                  123 likes
                </Text>
              </Flex>
              <Flex
                alignItems={"center"}
                gap={2}
                mt={2}
                _hover={{ cursor: "pointer" }}
              >
                <Icon as={LinkIcon} boxSize={6} color={"green.400"} />
                <Text fontWeight={"600"} color={"gray.600"}>
                  Link
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </>
  );
}

export default Post;
