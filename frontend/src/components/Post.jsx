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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  keyframes
} from "@chakra-ui/react";

import { useToast } from "@chakra-ui/react";
import { useUserAnonymous } from "../hooks/UseUserAnonymous";

import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { LinkIcon } from "@chakra-ui/icons";

import axios from "axios";
import { getTokenFromLocalStorage } from "../hooks/common";
import { useEffect, useState } from "react";

function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

const likeAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3)
  }
  100% {
    transform: scale(1)
  }
`

function Post(props) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(props.likes);

  const handleClickCopyLink = () => {
    navigator.clipboard.writeText(
      `http://localhost:5173/post-view/${props._id}`
    );
    copyLinkToast();
  };
  const handleClickViewPost = () => {
    window.open(`http://localhost:5173/post-view/${props._id}`);
  };
  const handleDeletePost = async () => {
    const token = getTokenFromLocalStorage();

    const response = await axios({
      method: "DELETE",
      url: `http://localhost:3000/posts/delete/${props._id}`,
      data: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    if (response.data.fulfilled) {
      setIsDeleted(true);
      deleteToast();
    }
  };
  const handleClickLikePost = () => {
    setIsLiked(!isLiked);

    isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
  }

  const toast = useToast();
  const copyLinkToast = () => {
    toast({
      title: "Link copied!",
      description: "Post link copied to clipboard",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  const reportToast = () => {
    toast({
      title: "Post reported",
      description: "This post will be reviewed",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
  };
  const deleteToast = () => {
    toast({
      title: "Post deleted",
      description: "Your post has been deleted",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const { user, authenticated } = useUserAnonymous();

  // Is post liked?
  useEffect(() => {
    if (props.user === null) { return; }
  }, [])
  

  if (isDeleted) {
    return null;
  }

  return (
    <>
      <Card
        w={"100%"}
        boxShadow={
          " rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.10) 0px 0px 0px 1px"
        }
        p={3}
      >
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<Icon as={FiMoreHorizontal} boxSize={8} color={"gray.400"} />}
            variant="outline"
            pos={"absolute"}
            right={4}
            size="36px"
            bg="white"
            color="white"
            _hover={{
              bg: "gray.200",
              cursor: "pointer",
            }}
            borderRadius={"50%"}
            p={1}
          />
          <MenuList>
            <MenuItem onClick={handleClickViewPost}>View Post</MenuItem>
            <MenuItem onClick={reportToast}>Report Post</MenuItem>
            {authenticated && user.username == props.author ? (
              <MenuItem onClick={handleDeletePost}>Delete Post</MenuItem>
            ) : null}
          </MenuList>
        </Menu>

        <CardHeader display={"flex"}>
          <Avatar
            name={props.author}
            w={16}
            h={16}
            mr={4}
          />
          <Flex
            flexDir={"column"}
            alignItems={"left"}
            justifyContent={"center"}
            h={16}
          >
            <Heading fontSize={"lg"} color={"blue.700"}>
              {props.author}
            </Heading>
            <Text color={"gray.400"}>
              {timeSince(new Date(props.datePosted))} ago
            </Text>
          </Flex>
        </CardHeader>

        <CardBody pt={0}>
          <Text fontSize={18}>{props.textContent}</Text>
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
                onClick={handleClickLikePost}
              >
                {
                  isLiked ? (
                    <Icon as={AiFillHeart} boxSize={8} color={"red.400"} animation={`${likeAnimation} 0.4s ease-in-out`}/>
                  ) : (
                    <Icon as={AiOutlineHeart} boxSize={8} color={"red.400"} />
                  )
                }
                <Text fontWeight={"600"} color={"gray.600"} userSelect={"none"}>
                  {likes} likes
                </Text>
              </Flex>
              <Flex
                alignItems={"center"}
                gap={2}
                mt={2}
                _hover={{ cursor: "pointer" }}
                onClick={handleClickCopyLink}
              >
                <Icon as={LinkIcon} boxSize={6} color={"green.400"} />
                <Text fontWeight={"600"} color={"gray.600"} userSelect={"none"}>
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
