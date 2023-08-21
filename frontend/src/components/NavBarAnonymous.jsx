import {
    Flex,
    Box,
    InputGroup,
    InputRightElement,
    Input,
  } from "@chakra-ui/react";
  
  import { useMediaQuery } from "@chakra-ui/react";
  
  import { SearchIcon } from "@chakra-ui/icons";
  
  function NavbarAnonymous() {
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
          justifyContent={"center"}
        >
          <Box
            as="div"
            className="icon-placeholder"
            w={10}
            h={10}
            bg={"blue.700"}
            m={14}
            borderRadius={8}
          ></Box>
        </Flex>
      );
    }
  }
  
  export default NavbarAnonymous;
  