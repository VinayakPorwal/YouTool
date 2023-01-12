import { useState } from "react";
import "./App.css";
import Component from "./Card";
import { Container } from "@chakra-ui/react";

function App() {
  const [count, setCount] = useState(0);

  return (
    
   <Container maxW="5500px" bg="purple.600" color="white" style={{minHeight:"100vh",
          background: "#ffffff80",
          color:"black"
        }}>
      <Component/>
   </Container>
  );
}

export default App;
