import { Text, Flex, Link } from "@chakra-ui/react";
import { useState } from "react";

function TextContent(props) {
  const splitByAtWords = (str) => {
    if (!str) {
      return []
    }
    const regex = /(@\w+)/g;
    return str.split(regex);
  };

  const tagParse = (text, index) => {
    if (text.startsWith("@")) {
      return (
        <Link
          color={"blue.400"}
          display={"inline"}
          key={text + index}
          fontSize={18}
          href={`http://localhost:5173/profile/${text.substring(1)}`}
        >
          {text}
        </Link>
      );
    } else {
      return (
        <Text display={"inline"} key={text + index} fontSize={18}>
          {text}
        </Text>
      );
    }
  };

  const [splitText] = useState(splitByAtWords(props.text));

  return (
    <Flex gap={"4px"}>
      {splitText.map((word, index) => tagParse(word, index))}
    </Flex>
  );
}

export default TextContent;
