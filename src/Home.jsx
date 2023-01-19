import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
} from "@chakra-ui/react";
import img from "./logopng.png";
function Home() {
  return (
    <div
      style={{
        height: "82vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div>
        <img src={img} alt="" style={{ height: "100px", margin: "2vh auto" }} />
        <Text size="sm" color="blue.500" textAlign={"center"}>
          Go to Trending Page!
        </Text>
        <Heading
          size="lg"
          m="8"
          style={{
            textAlign: "center",
            width: "100%",
          }}
        >
          This Page is Under Devlopment.Stay Tuned!
        </Heading>
      </div>
    </div>
  );
}

export default Home;
