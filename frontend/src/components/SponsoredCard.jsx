import { Card, Flex, Image, Heading, CardHeader, CardBody } from "@chakra-ui/react";

// import adImage from "../assets/ad_image.png"


function SponsoredCard() {
    return (
        <Card
        w={"100%"}
        boxShadow={
          " rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.10) 0px 0px 0px 1px"
        }
        p={3}
      >
        <CardHeader p={2}>
            <Heading fontSize={"md"}>Sponsored</Heading>
        </CardHeader>
        <CardBody>
            <Image src={"adImage"} />
        </CardBody>
      </Card>
    );
}

export default SponsoredCard;