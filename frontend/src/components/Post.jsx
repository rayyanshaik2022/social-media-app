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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";

import { useToast } from '@chakra-ui/react'

import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { LinkIcon } from "@chakra-ui/icons";

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

function Post(props) {

  const toast = useToast()

  const reportToast = () => {
    toast({
      title: 'Post reported',
      description: "This post will be reviewed",
      status: 'warning',
      duration: 3000,
      isClosable: true,
    })
  }

  const deleteToast = () => {
    toast({
      title: 'Post deleted',
      description: "Your post has been deleted",
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
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
            <MenuItem>View Post</MenuItem>
            <MenuItem onClick={reportToast}>Report Post</MenuItem>
            <MenuItem onClick={deleteToast}>Delete Post</MenuItem>
          </MenuList>
        </Menu>

        <CardHeader display={"flex"}>
          <Avatar
            name={props.author}
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
              {props.author}
            </Heading>
            <Text color={"gray.400"}>
              {timeSince(new Date(props.datePosted))}
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
              >
                <Icon as={AiOutlineHeart} boxSize={8} color={"red.400"} />
                <Text fontWeight={"600"} color={"gray.600"}>
                  {props.likes} likes
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
