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
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";
import { FaUser, FaBell } from "react-icons/fa"

function Navbar() {
  return (
    <Flex w={"100%"} h={"110px"} bg={"white"} alignItems={"center"} position={"sticky"} top={0} >
      <Box
        as="div"
        className="icon-placeholder"
        w={14}
        h={14}
        bg={"blue.700"}
        m={14}
        borderRadius={8}
      ></Box>
      <InputGroup w={"40%"} bg={"gray.50"}>
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
          name="Dan Abrahmov"
          width={"56px"}
          h={"56px"}
          src="https://bit.ly/dan-abramov"
        />
        <Text fontWeight={"700"} fontSize={"17px"}>
          Rayyan Shaik
        </Text>
        <Box w={"2px"} h={"40px"} bg={"gray.100"}></Box>
        <Icon as={FaBell} boxSize={6} color={"#a6e2f5"} />
        <Icon as={FaUser} boxSize={6} color={"#a6e2f5"}/>
      </Flex>
    </Flex>
  );
}

export default Navbar;
