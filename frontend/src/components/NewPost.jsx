import {
  Card,
  Divider,
  Flex,
  Icon,
  Text,
  Avatar,
  Textarea
} from "@chakra-ui/react";
import { AiFillPicture } from "react-icons/ai";

function NewPost() {
  return (
    <>
      <Card
        w={"100%"}
        boxShadow={
          " rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.10) 0px 0px 0px 1px"
        }
        p={3}
      >
        <Flex flexDir={"column"}>
          <Flex gap={2}>
            <Avatar
              name="Rayyan Shaik"
              width={12}
              h={12}
              src="https://bit.ly/dan-abramov"
            />
            <Textarea border={"none"} placeholder='Whats on your mind, Rayyan?' />
          </Flex>
          <Flex flexDir={"column"}>
            <Divider mt={2} />
            <Flex alignItems={"center"} gap={2} mt={2}>
              <Icon as={AiFillPicture} boxSize={8} color={"blue.300"} />
              <Text fontWeight={"600"} color={"gray.600"}>
                Photo/Video
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </>
  );
}

export default NewPost;
