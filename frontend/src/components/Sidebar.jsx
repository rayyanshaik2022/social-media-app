import { useRadioGroup } from "@chakra-ui/react";
import { Flex, Icon } from "@chakra-ui/react";
import RadioCard from "./RadioCard";

import { FaHome, FaUsers } from "react-icons/fa";

function SideBar() {
  const options = ["Home", "Groups"];
  const icons = [
    <Icon as={FaHome} boxSize={6} color={"#8890ba"} mr={2} />,
    <Icon as={FaUsers} boxSize={6} color={"#8890ba"} mr={2}/>
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "Home",
    onChange: console.log,
  });

  const group = getRootProps();
  return (
    <Flex flexDir={"column"} width={"100%"} bg={"gray.100"} {...group} py={12}>
      {options.map((value, index) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {icons[index]} 
            {value}
          </RadioCard>
        );
      })}
    </Flex>
  );
}

export default SideBar;
