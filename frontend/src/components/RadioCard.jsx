import { Box } from "@chakra-ui/react";
import { useRadio } from "@chakra-ui/react";

function RadioCard(props) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        px={"32px"}
        color={"gray.400"}
        fontSize={"18px"}
        fontWeight={"500"}
        h={"48px"}
        _checked={{
          bg: "gray.50",
          borderLeft: "6px solid #2e41a3",
          px: "calc(32px - 6px)",
          color: "#8890ba"
        }}
        display={"flex"}
        alignItems={"center"}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export default RadioCard;
