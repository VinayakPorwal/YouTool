import React, { useState } from "react";
import { Input } from "@chakra-ui/react";
import {
  Button,
  Image,
  CardBody,
  Card,
  Text,
  Heading,
  Tabs,
  TabList,
  Tab,
} from "@chakra-ui/react";
import "./App.css";
import DesignCard2 from "./DesignCard2";
import ChannelCard from "./ChannleCard";
import RecentCard from "./smallCard";

function Component(props) {
  const [array, setArray] = useState([]);
  const [check, setCheck] = useState();
  const [deta, setDeta] = useState();

  const [toggle, setToggle] = useState(false);
  const [input, setInput] = useState(
    "https://www.youtube.com/channel/UCqwUrj10mAEsqezcItqvwEw"
  );
  const [placeHolder, setPlaceHolder] = useState("");
  const count = 8;
  var mainData = [];
  var recData = [];
  const api_key = "AIzaSyC6iuW5Oz08bv_e8pGIRTkyERDlTH5mWAc";
  const api_key2 = "AIzaSyC6Q6QFsLZWlEJfmOUYgEXbh19m9NVIjpw";

  const loading = document.getElementById("loading");
  async function keySearch() {
    setArray([]);
    setDeta([]);
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
      if (input === inputFilter) {
        inputFilter = input.replace("https://www.youtube.com/", "");
        console.log(inputFilter);
        await ChannelByUsername(inputFilter);
      } else {
        console.log("channel ID", inputFilter);
        await ChannelById(inputFilter);
        console.log(await RecentVideos(inputFilter));
        // console.log("recent 10 videos",recent);
        setCheck(2);
      }
      setArray(mainData);

      // console.log("channel data",array);
      loading.style.display = "none";
    }
    // Video Id
    else if (toggle === 3) {
      console.log("jbaksn", input);
      var inputFilter = input.replace("https://www.youtube.com/watch?v=", "");
      console.log(inputFilter);
      await Detailed(inputFilter);
      setCheck(3);
      setArray(mainData);
      console.log(array);
      loading.style.display = "none";
    }
  }

  async function Detailed2(id) {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${id}&key=${api_key}`
    );
    const data = await response.json();
    recData.push(data);
    console.log("Video", data.pageInfo.totalResults);

    return data;
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
  async function RecentVideos(channelID) {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelID}&maxResults=10&order=date&type=video&key=${api_key2}`
    );
    var data = await response.json();
    // setRecent(data);
    recData = [];
    data = data.items;
    console.log("Recents 10 video id", data);
    data.map(async (load, i) => {
      await Detailed2(load.id.videoId);
      if (recData.length === data.length) {
        setDeta(recData);
        console.log(deta);
      }
    });

    return deta;
  }

  return (
    <>
      <Heading size="lg" style={{ textAlign: "center" ,margin:"2vh" }}>
        Search Your Youtube Video
      </Heading>
      Search By:
      <Tabs colorScheme="green" mb="2" isFitted variant="enclosed">
        <TabList>
          <Tab
            onClick={() => {
              setToggle(1);
              // setInput("");
              setPlaceHolder("BB ki Vines");
            }}
            _selected={{ color: "white", bg: "#252525" }}
          >
            Keyword
          </Tab>
          <Tab
            onClick={() => {
              setToggle(2);
              // setInput("");
              setPlaceHolder("https://www.youtube.com/channel/");
            }}
            _selected={{ color: "white", bg: "#252525" }}
            // isDisabled
          >
            Channel Link
          </Tab>
          <Tab
            onClick={() => {
              setToggle(3);
              // setInput("");
              setPlaceHolder("https://www.youtube.com/watch?v=");
            }}
            _selected={{ color: "white", bg: "#252525" }}
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
          background: "#ececec",
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
        <button style={{width:"30px", fontSize:"large", fontWeight:"600"}} onClick={()=>setInput("")}>x</button>
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
        {/* // Keyword Search Or Single Video search  */}
        {check !== 2 ? (
          array.map((data, i) => (
            <>
              {data.pageInfo.totalResults === 1 ? (
                <div key={i} className="mainCardDiv" style={{ width: "auto" }}>
                  <DesignCard2 data={data} wd={"200px"} />
                </div>
              ) : (
                <div style={{ display: "none" }}> </div>
              )}
            </>
          ))
        ) : (
          <></>
        )}

        {/* // Channel Section */}
        {check === 2 ? (
          <>
            {array.map((data, i) => (
              <>
                {data.pageInfo.totalResults === 1 ? (
                  <div
                    key={i}
                    className="mainCardDiv"
                    style={{ width: "auto" }}
                  >
                    <ChannelCard data={data} />
                  </div>
                ) : (
                  <div style={{ display: "none" }}> </div>
                )}
              </>
            ))}
            <Heading size="md" m="3" style={{ textAlign: "left" }}>
              Recent Videos
            </Heading>

            <div
              style={{
                margin: "auto",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
                maxWidth: "1100px",
              }}
            >
              {deta ? (
                deta.map((data, i) => (
                  <>
                    <div
                      key={i}
                      className="mainCardDiv"
                      style={{ width: "auto" }}
                    >
                      <DesignCard2 data={data} wd={"200px"} key={i} />
                    </div>
                  </>
                ))
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <></>
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
