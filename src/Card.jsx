import React, { useState } from "react";
import { Input } from "@chakra-ui/react";
import {
  Button,
  Image,
  CardBody,
  Card,
  Text,
  Heading,
  Switch,
  Select,
  FormControl,
  FormLabel,
  Tabs,
  TabList,
  Tab,
} from "@chakra-ui/react";
import "./App.css";
import DesignCard2 from "./DesignCard2";
import ChannelCard from "./Designcard";

function Component(props) {
  const [array, setArray] = useState([]);
  const [check, setCheck] = useState();
  const [toggle, setToggle] = useState(false);
  const [input, setInput] = useState("");
  const [placeHolder, setPlaceHolder] = useState("");
  const count = 8;
  var mainData = [];
  const api_key = "AIzaSyC6iuW5Oz08bv_e8pGIRTkyERDlTH5mWAc";

  const loading = document.getElementById("loading");
  async function keySearch() {
    setArray([]);
    loading.style.display = "block";
    if (toggle === 1) {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?q=${input}&maxResults=${count}&key=${api_key}`
      );
      let data = await response.json();
      mainData = [];
      data = data.items;
      data.map(async (load, i) => {
        await Detailed(load.id.videoId);
        console.log(mainData.length, mainData);
        if (mainData.length === data.length) {
          setCheck(1);
          setArray(mainData);
          loading.style.display = "none";
        }
        // console.log(i, load.id.videoId);
      });
    }
    // Channel Id
    else if (toggle === 2) {
      
      var inputFilter = input.replace("https://www.youtube.com/channel/", "");
      if (input===inputFilter){
        inputFilter = input.replace("https://www.youtube.com/", "") 
        console.log(inputFilter)
        await ChannelByUsername(inputFilter);
      }
      else{

        console.log(inputFilter)
        await ChannelById(inputFilter);
        setCheck(2);
      }
      setArray(mainData);
      console.log(array)
      loading.style.display = "none";
    }
    // Video Id
    else if (toggle === 3) {
      console.log("jbaksn",input)
      var inputFilter = input.replace("https://www.youtube.com/watch?v=", "");
      console.log(inputFilter)
      await Detailed(inputFilter);
      setCheck(3);
      setArray(mainData);
      console.log(array)
      loading.style.display = "none";
    }
  }
  async function Detailed(id) {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${id}&key=${api_key}`
    );
    const data = await response.json();
    mainData.push(data);

    console.log("Video", data.pageInfo.totalResults);
    // props.set;
    return data;
  }
  async function ChannelById(id) {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${id}&key=${api_key}`
    );
    const data = await response.json();
    mainData.push(data);

    console.log("channel", data.pageInfo.totalResults);
    // props.set;
    return data;
  }
  async function ChannelByUsername(username) {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&forUsername=${username}&key=${api_key}`
    );
    const data = await response.json();
    mainData.push(data);

    console.log("channel", data.pageInfo.totalResults);
    // props.set;
    return data;
  }

  return (
    <>
      <Heading size="lg" style={{ textAlign: "center" }}>
        Search Your Youtube Video
      </Heading>
      Search By:
      <Tabs colorScheme="green" mb="2" isFitted variant="enclosed">
        <TabList>
          <Tab
            onClick={() => {setToggle(1);
            setInput("");
            setPlaceHolder("BB ki Vines");
            
          }}
          _selected={{ color: "white", bg: "green.500" }}
          >
            Keyword
          </Tab>
          <Tab
            onClick={() => {setToggle(2);
              setInput("");
              setPlaceHolder("https://www.youtube.com/channel/");
              
            }}
            _selected={{ color: "white", bg: "green.500" }} 
            // isDisabled
            >
            Channel Link
          </Tab>
          <Tab
            onClick={() => {setToggle(3);
              setInput("");
              setPlaceHolder("https://www.youtube.com/watch?v=");
              
            }}
            _selected={{ color: "white", bg: "green.500" }}
          >
            Video Link
          </Tab>
        </TabList>
      </Tabs>
      <div
        style={{
          display: "flex",
          padding: "2vh",
          maxWidth: "1200px",
          margin: "auto",
          position: "sticky",
          top: "0px",
          background: "#6b46c1",
          borderRadius: "10px",
          // background: "#3f79e6",
          zIndex: "2",
        }}
      >
        <Input
          placeholder={placeHolder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button colorScheme="blue" onClick={keySearch}> 
          Button
        </Button>
      </div>
      <Card
        id="loading"
        maxW="lg"
        borderRadius="lg"
        style={{ background: "white", margin: "2vh", display: "none" }}
      >
        <CardBody>
          <span className="loader"></span>
        </CardBody>
      </Card>
      <div
        style={{
          margin: "auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          maxWidth: "1100px",
        }}
      >
        
        {check !==2 ? (
          array.map((data, i) => (
            <>
              {data.pageInfo.totalResults === 1 ? (
                <div key={i} className="mainCardDiv">
                  <DesignCard2 data={data} />
                </div>
              ) : (
                <div style={{ display: "none" }}> </div>
              )}
            </>
          ))
        ) : (
          array.map((data, i) => (
            <>
              {data.pageInfo.totalResults === 1 ? (
                <div key={i} className="mainCardDiv" style={{width:"auto"}}>
                  <ChannelCard data={data} />
                </div>
              ) : (
                <div style={{ display: "none" }}> </div>
              )}
            </>
          ))
        )}
       
      </div>
      <div>
        <Text fontSize="xl" style={{ textAlign: "center", padding: "2vh" }}>
          More Features Coming Soon.. Site is Under Development
        </Text>
      </div>
    </>
  );
}

export default Component;
