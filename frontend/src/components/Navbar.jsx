import {
  Flex,
  Box,
  InputGroup,
  InputRightElement,
  Input,
  Icon,
  Avatar,
  Text,
  Spacer,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import { useMediaQuery } from "@chakra-ui/react";

import { SearchIcon, HamburgerIcon } from "@chakra-ui/icons";
import { FaUser, FaBell, FaHome, FaUsers } from "react-icons/fa";

function Navbar(props) {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  if (isLargerThan768) {
    return (
      <Flex w={"100%"} h={"110px"} bg={"white"} alignItems={"center"} top={0}>
        <Box
          as="div"
          className="icon-placeholder"
          w={14}
          h={14}
          bg={"blue.700"}
          m={14}
          borderRadius={8}
        ></Box>
        <InputGroup w={"40%"} bg={"gray.50"} mr={8}>
          <InputRightElement pointerEvents="none" mt={2} mr={2}>
            <SearchIcon color="gray.300" boxSize={6} />
          </InputRightElement>
          <Input
            type="text"
            placeholder="Search"
            color={"gray.600"}
            h={14}
            fontSize={"17px"}
          />
        </InputGroup>

        <Spacer />
        <Flex alignItems={"center"} gap={"16px"} mr={14}>
          <Avatar
            name={props.displayName}
            width={"56px"}
            h={"56px"}
          />
          <Text fontWeight={"700"} fontSize={"17px"}>
            {props.displayName}
          </Text>
          <Box w={"2px"} h={"40px"} bg={"gray.100"}></Box>
          <Icon as={FaBell} boxSize={6} color={"#9ac9f5"} />
          <Icon as={FaUser} boxSize={6} color={"#9ac9f5"} />
        </Flex>
      </Flex>
    );
  } else {
    return (
      <Flex
        w={"100%"}
        h={"70px"}
        bg={"white"}
        alignItems={"center"}
        position={"sticky"}
        zIndex={3}
        top={0}
        justifyContent={"space-between"}
      >
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon boxSize={6} color={"gray.600"}/>}
            variant="outline"
            ml={4}
            mr={8}
            boxSize={10}
          />
          <MenuList>
            <MenuItem icon={<FaHome />}>Home</MenuItem>
            <MenuItem icon={<FaUsers />}>Groups</MenuItem>
          </MenuList>
        </Menu>

        <Box
          as="div"
          className="icon-placeholder"
          w={10}
          h={10}
          bg={"blue.700"}
          m={14}
          borderRadius={8}
        ></Box>

        <Flex alignItems={"center"} gap={"16px"} mr={4}>
          <Icon as={FaBell} boxSize={6} color={"#9ac9f5"} />
          <Icon as={FaUser} boxSize={6} color={"#9ac9f5"} />
        </Flex>
      </Flex>
    );
  }
}

export default Navbar;
