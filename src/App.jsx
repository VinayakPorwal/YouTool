import { BrowserRouter, Routes, Route,useNavigate } from "react-router-dom";
import "./App.css";
import Component from "./Card";
import { Container } from "@chakra-ui/react";
import Home from "./Home";
import React, { useEffect, useState } from "react";
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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
} from "@chakra-ui/react";
import "./App.css";
import DesignCard2 from "./DesignCards/DesignCard2";
import img from "./logopng.png";
import FullVideo from "./Components/FullVideo";
import Trending from "./Components/Trending";
import Channel from "./Components/Channel";
import { nn } from "date-fns/locale";

function App() {
  const [array, setArray] = useState([]);
  const [check, setCheck] = useState();
  const [deta, setDeta] = useState();
  const [tab, setTab] = useState("Filter");
  const country = "IN";
  var temp = "";

  const [toggle, setToggle] = useState(2);
  const [input, setInput] = useState(
    "https://www.youtube.com/channel/UCqwUrj10mAEsqezcItqvwEw"
  );
  const [placeHolder, setPlaceHolder] = useState("");
  const count = 16;
  var mainData = [];
  var recData = [];
  // const api_key = "AIzaSyC6iuW5Oz08bv_e8pGIRTkyERDlTH5mWAc";
  const api_key = "AIzaSyBeeesEJBFwXveug3nhfplFjuh5EDzdqRs";
  const api_key2 = "AIzaSyBeeesEJBFwXveug3nhfplFjuh5EDzdqRs";
  // const api_key2 = "AIzaSyC6Q6QFsLZWlEJfmOUYgEXbh19m9NVIjpw";

  const loading = document.getElementById("loading");
  async function keySearch() {
    setArray([]);
    setDeta([]);
    loading.style.display = "block";

    //keyword
    if (toggle === 1) {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?q=${input}&maxResults=${count}&key=${api_key}`
      );
      let data = await response.json();
      if (data.pageInfo.totalResults === 0) {
        alert("Results Not Found");
        loading.style.display = "none";
        return;
      }
      mainData = [];
      data = data.items;
      data.map(async (load, i) => {
        await Detailed(load.id.videoId);
        // console.log(mainData.length, mainData);
        if (mainData.length === data.length) {
          setCheck(1);
          setArray(mainData);
          mainData = [];
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
      mainData = [];
      // console.log("channel data",array);
      loading.style.display = "none";
    }

    // Video Id
    else if (toggle === 3) {
      var inputFilter = input.replace("https://www.youtube.com/watch?v=", "");
      if (input === inputFilter) {
        inputFilter = input.replace("https://youtu.be/", "");
      }
      if (input === inputFilter) {
        alert("please insert Correct Url");
        loading.style.display = "none";
        return;
      }
      toggle3(inputFilter);
    }
  }

  const toggle3 = async (inputFilter) => {
    await Detailed(inputFilter);
    setCheck(3);
    setArray(mainData);
    mainData = [];
    console.log(array);
    loading.style.display = "none";
  };

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

    // console.log("channel", data);
    // props.set;
    return data;
  }
  async function PassChannel(id) {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${id}&key=${api_key}`
    );
    const data = await response.json();

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
    if (data.pageInfo.totalResults === 0) {
      alert("incorrect Url or Channel Id");
      return;
    }
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

  async function trending() {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet,statistics&chart=mostPopular&regionCode=${country}&key=${api_key}&maxResults=${count}`
    );
    let data = await response.json();
    if (data.pageInfo.totalResults === 0) {
      alert("Results Not Found");
      loading.style.display = "none";
      return;
    }
    setCheck(4);
    setArray(data.items);
    loading.style.display = "none";
  }
  useEffect(() => {
    trending();
  }, []);

  const navigate = useNavigate();
  return (


    <>
      {/* <Container
        maxW="5500px"
        bg="purple.600"
        color="white"
        style={{
          minHeight: "100vh",
          background: "#ffffff80",
          color: "black",
          margin: "0",
          padding: "0",
        }}
      >
        <Component />
      </Container> */}

      <div style={{ display: "flex", margin: "0", padding: "0" }}>
        <div className="sideBar">
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginBottom: "2vh",
              alignItems: "center",
            }}
          >
            <i
              className="fa fa-bars"
              style={{
                display: "flex",
                width: "30%",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></i>

            <div className="logo">
              <div className="youtube">
                <img src={img} alt="" />
              </div>

              <p>YouTool</p>
            </div>
          </div>

          {/* ---------------------------- filter --------------------------- */}
          <Divider />
          <Menu>
            <MenuButton
              style={{ display: "flex", margin: "1rem auto", color: "white" }}
              onClick={() => {
                var button = document.getElementById(`tabselect`);
                if (button.style.transform === "rotate(0deg)") {
                  button.style.transform = "rotate(180deg)";
                } else {
                  button.style.transform = "rotate(0deg)";
                }
              }}
            >
              <i
                className="fa fa-chevron-down"
                style={{
                  fontSize: "xx-small",
                  margin: "0 5px",
                  transform: "rotate(0deg)",
                }}
                title="Filter"
                id="tabselect"
              ></i>
              <i
                className="fa fa-filter"
                style={{ fontSize: "smaller", margin: "0 10px 0 0" }}
              ></i>
              {tab}{" "}
            </MenuButton>
            <div style={{ zIndex: "2" }}>
              <MenuList
                style={{
                  background: "var(--secondaryBlack)",
                  zIndex: "77",
                  position: "absolute",
                  color: "white",
                }}
              >
                <MenuItem
                  className="Tab"
                  onClick={() => {
                    setToggle(1);
                    setTab("Search by : Keyword");
                    // setInput("");
                    setPlaceHolder("BB ki Vines");
                  }}
                >
                  Keyword
                </MenuItem>
                <MenuItem
                  className="Tab"
                  onClick={() => {
                    setToggle(2);
                    setTab("Search by : Channel");
                    // setInput("");
                    setPlaceHolder("https://www.youtube.com/channel/");
                  }}
                >
                  Channel Link
                </MenuItem>
                <MenuItem
                  className="Tab"
                  onClick={() => {
                    setToggle(3);
                    // setInput("");
                    setTab("Search by : Video");
                    setPlaceHolder("https://www.youtube.com/watch?v=");
                  }}
                >
                  Video Link
                </MenuItem>
              </MenuList>
            </div>
          </Menu>
          <Divider />
          <div>
            <div className="sideTab">
              <i className="fa fa-home sideTab-i" style={{ color: "grey" }}></i>
              <p className="sideTab-p" style={{ color: "grey" }}>
                Home
              </p>
            </div>
            <div className="sideTab" onClick={() => {trending()
            navigate("/trending")
            }}>
              <i className="fa fa-fire sideTab-i"></i>
              <p className="sideTab-p">Trending</p>
            </div>
            <div className="sideTab">
              <i
                className="fa fa-history sideTab-i"
                style={{ color: "grey" }}
              ></i>
              <p className="sideTab-p" style={{ color: "grey" }}>
                History
              </p>
            </div>
          </div>
        </div>
        <div className="MainContainer" style={{ width: "84%" }}>
          {/* <Heading
            size="lg"
            style={{ textAlign: "center", margin: "2vh", color: "white" }}
          >
            Search Your Youtube Video
          </Heading> */}
          {/* ------------------- Video Search Type Selection --------------- */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              position: "sticky",
              zIndex: "2",
              top: "0px",
              background: "var(--secondaryBlack)",
            }}
          >
            {/* ----------------------- Input Group---- ---------------- */}
            <div className="InputGroup">
              <input
                className="input"
                placeholder={placeHolder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                style={{
                  width: "50px",
                  fontSize: "large",
                  transform: "rotate(45deg)",
                }}
                onClick={() => setInput("")}
              >
                <i className="fa fa-plus"></i>
              </button>
              <Button
                colorScheme="blue"
                className="button--submit"
                onClick={keySearch}
              >
                <i className="fa fa-search"></i>
              </Button>
            </div>
          </div>

          {/* --------------- Skeleton Loader ------------ */}
          <Card id="loading" maxW="lg" borderRadius="lg">
            <CardBody>
              <span className="loader"></span>
            </CardBody>
          </Card>

          {/* --------------------Display Results------ ------------- */}
          <div className="CardGroup">
            {/* -------------------Keyword Search Section-------------------- */}
            {check === 1 ? (
              array.map((data, i) => (
                <>
                  {data.pageInfo.totalResults >= 1 ? (
                    <div
                      key={i}
                      className="mainCardDiv"
                      style={{ width: "auto" }}
                    >
                      <DesignCard2
                        toggle={check}
                        fun={toggle3}
                        api_key={api_key}
                        chanFun={PassChannel}
                        data={data}
                        wd={"310px"}
                        ht={"170px"}
                        key={i}
                        info={{
                          date: data.items[0].snippet.publishedAt,
                          url: data.items[0].snippet.thumbnails.medium.url,
                          views: data.items[0].statistics.viewCount,
                          duration: data.items[0].contentDetails.duration,
                          id: data.items[0].id,
                          channelTitle: data.items[0].snippet.channelTitle,
                          likes: data.items[0].statistics.likeCount,
                          comments: data.items[0].statistics.commentCount,
                          description:
                            data.items[0].snippet.localized.description,
                          channelId: data.items[0].snippet.channelId,
                          title: data.items[0].snippet.localized.title,
                        }}
                      />
                    </div>
                  ) : (
                    <div style={{ display: "none" }}> </div>
                  )}
                </>
              ))
            ) : (
              <></>
            )}

            {/* -----------------------------Channel Section------------------- */}
            {check === 2 && (
              <Channel
                array={array}
                deta={deta}
                check={check}
                toggle3={toggle3}
                api_key={api_key}
                PassChannel={PassChannel}
              />
            )}

            {/* ------------------- Video Full view Section--------------------- */}
            {check === 3 && (
              <FullVideo
                array={array}
                check={check}
                api_key={api_key}
                PassChannel={PassChannel}
              />
            )}

            {/* -------------------------------Trending Section ---------------------------- */}
            {check === 4 && (
              // <Trending
              //   array={array}
              //   check={check}
              //   toggle3={toggle3}
              //   api_key={api_key}
              //   PassChannel={PassChannel}
              // />

                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/trending"
                    element={
                      <Trending
                        array={array}
                        check={check}
                        toggle3={toggle3}
                        api_key={api_key}
                        PassChannel={PassChannel}
                      />
                    }
                  />
                </Routes>
            )}
          </div>
          <div>
            <Text
              fontSize="xl"
              style={{
                textAlign: "center",
                padding: "2vh",
                background: "var(--secondaryBlack)",
                color: "white",
              }}
            >
              More Features Coming Soon.. Site is Under Development
            </Text>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
