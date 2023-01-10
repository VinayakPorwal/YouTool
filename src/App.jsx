import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Component from "./Card";
import { Container } from "@chakra-ui/react";
import Designcard from "./Designcard";
import DesignCard2 from "./DesignCard2";

function App() {
  const [count, setCount] = useState(0);

  return (
    
   <Container maxW="5500px" bg="purple.600" color="white" style={{minHeight:"100vh"}}>
      <Component/>
   </Container>
  );
}

export default App;
