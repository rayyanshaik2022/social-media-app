import {
  Card,
  Divider,
  Flex,
  Icon,
  Text,
  Avatar,
  Input,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useUser } from "../hooks/UseUser";
import { AiFillPicture } from "react-icons/ai";
import axios from "axios";
import { getTokenFromLocalStorage } from "../hooks/common";

function NewPost(props) {
  const [textContent, setTextContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const toast = useToast();

  const createPost = async () => {
    const newPost = {
      author: user.username,
      textContent: textContent,
    };

    try {
      setIsLoading(true);

      const token = getTokenFromLocalStorage();

      const response = await axios({
        method: "POST",
        url: "http://localhost:3000/posts/new",
        data: newPost,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.status == 200) {
        console.log("Something went wrong when creating a post!", response);
        return;
      }

      props.setCurrentPosts(response.data.posts);
      toast({
        title: "New Post",
        description: "Your post has been added to the feed",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

    } catch (err) {
      console.log("Some error occured during post creation ", err);
    } finally {
      setIsLoading(false);
      setTextContent("");
    }
  };

  return (
    <>
      <Card
        w={"100%"}
        boxShadow={
          " rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.10) 0px 0px 0px 1px"
        }
        p={3}
      >
        <Flex flexDir={"column"} p={2}>
          <Flex gap={2}>
            <Avatar
              name={props.displayName}
              width={12}
              h={12}
              mr={2}
            />
            {/* <Textarea
              border={"none"}
              placeholder="Whats on your mind, Rayyan?"
            /> */}
            <Input
              placeholder={`Whats on your mind, ${props.displayName}?`}
              variant="unstyled"
              size="md"
              value={textContent}
              onChange={(e) => {
                setTextContent(e.target.value);
              }}
            />
          </Flex>
          <Flex flexDir={"column"}>
            <Divider mt={2} />
            <Flex alignItems={"center"} justifyContent={"space-between"} mt={4}>
              <Flex
                alignItems={"center"}
                gap={2}
                mt={2}
                _hover={{ cursor: "pointer" }}
              >
                <Icon as={AiFillPicture} boxSize={8} color={"blue.300"} />
                <Text fontWeight={"600"} color={"gray.600"}>
                  Photo/Video
                </Text>
              </Flex>
              <Button
                isLoading={isLoading}
                onClick={createPost}
                colorScheme="blue"
                variant="outline"
                size={"md"}
              >
                Post
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </>
  );
}

export default NewPost;
