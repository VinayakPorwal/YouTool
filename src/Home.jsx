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
import img from "./logopng.png"
function Home() {
  return (
    <div>


      <img src={img} alt="" style={{height:"100px",margin:"auto"}} />
      <Text size="sm" color="blue.500" textAlign={"center"}>Go to Trending Page!</Text>
      <Heading
        size="lg"
        m="8"
        style={{
          alignItems: "center",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        
        <p>This Page is Under Devlopment.Stay Tuned!</p>
      </Heading>
     
    </div>
  );
}

export default Home;
