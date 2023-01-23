import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Component from "./Card";
import { Container } from "@chakra-ui/react";
import Home from "./Home";
import React, { useEffect, useState } from "react";
import {
  Button,
  CardBody,
  Card,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import "./App.css";
import DesignCard2 from "./DesignCards/DesignCard2";
import FullVideo from "./Components/FullVideo";
import Trending from "./Components/Trending";
import Channel from "./Components/Channel";
import Sidebar from "./Components/Sidebar";
import img from "./logopng.png";
import Downlods from "./Components/Downlods";
import History from "./Components/History";

function App() {
  const [array, setArray] = useState([]);
  const [check, setCheck] = useState();
  const [deta, setDeta] = useState();
  const [tab, setTab] = useState("Filter");
  const [loading, setLoading] = useState(false);
  const country = "IN";
  var temp = "";

  const [toggle, setToggle] = useState(2);
  const [input, setInput] = useState(
    "https://www.youtube.com/channel/UCqwUrj10mAEsqezcItqvwEw"
  );
  const [placeHolder, setPlaceHolder] = useState("");
  const seachHistory = JSON.parse(localStorage.getItem("SearchHistory"));
  const count = 16;
  var mainData = [];
  var recData = [];
  // const api_key = "AIzaSyC6iuW5Oz08bv_e8pGIRTkyERDlTH5mWAc";
  // const api_key2 = "AIzaSyC6iuW5Oz08bv_e8pGIRTkyERDlTH5mWAc";
  // const api_key = "AIzaSyBeeesEJBFwXveug3nhfplFjuh5EDzdqRs";
  // const api_key2 = "AIzaSyBeeesEJBFwXveug3nhfplFjuh5EDzdqRs";
  const api_key = "AIzaSyB8uW_Tr7djLzI-ZCZyxgb8S8U3u9VcFu4";
  const api_key2 = "AIzaSyB8uW_Tr7djLzI-ZCZyxgb8S8U3u9VcFu4";
  // const api_key2 = "AIzaSyC6Q6QFsLZWlEJfmOUYgEXbh19m9NVIjpw";

  // const loading = document.getElementById("loading");

  const LinkCheck = (str) => {
    // console.log((str), 'type-------------------------------')
    if (str.includes("watch")) {
      // str = str.replace("https://www.youtube.com/watch?v=", "");
      setToggle(3);
      console.log("3");
      return 3;
      // keySearch();
    } else if (str.includes("channel")) {
      // str = str.replace("https://www.youtube.com/channel/", "");
      setToggle(2);
      console.log("2");
      return 2;
      // keySearch();
      // alert("this is Channel Link");
    } else {
      setToggle(1);
      console.log("1");
      return 1;
      // keySearch();
    }
  };

  async function keySearch(i) {
    setArray([]);
    setDeta([]);
    // loading.style.display = "block";
    setLoading(true);

    //keyword
    if (i === 1) {
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
          // loading.style.display = "none";
          setLoading(false);
        }
        // console.log(i, load.id.videoId);
      });
    }

    // Channel Id
    else if (i === 2) {
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
      // loading.style.display = "none";
      setLoading(false);
    }

    // Video Id
    else if (i === 3) {
      var inputFilter = input.replace("https://www.youtube.com/watch?v=", "");
      if (input === inputFilter) {
        inputFilter = input.replace("https://youtu.be/", "");
      }
      if (input === inputFilter) {
        alert("please insert Correct Url");
        // loading.style.display = "none";
        setLoading(false);

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
    // loading.style.display = "none";
    setLoading(false);
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
      // loading.style.display = "none";
      return;
    }
    setCheck(4);
    setArray(data.items);
    // loading.style.display = "none";
  }

  async function home() {
    console.log("home");
    setCheck(4);
  }
  useEffect(() => {
    trending();
  }, []);

  function SearchHistory() {
    var searchData = JSON.parse(localStorage.getItem("SearchHistory"));
    if (searchData) {
      var newArr = searchData.filter((searchData) => {
        return searchData.id !== input;
      });
      if (searchData.length !== newArr.length) {
        console.log("Already Exists");
        return;
      } else {
        searchData.unshift({
          id: input,
        });
        if (searchData.length > 10) {
          searchData = searchData.slice(0, 10);
        }
        localStorage.setItem("SearchHistory", JSON.stringify(searchData));
      }
    } else {
      searchData = [];
      searchData.unshift({
        id: input,
      });
      localStorage.setItem("SearchHistory", JSON.stringify(searchData));
      console.log("Key not found");
    }
  }

  useEffect(() => {
    if (check === 1) {
      setTab("Search by : Keyword");
    } else if (check === 2) {
      setTab("Search by : Channel");
    } else if (check === 3) {
      setTab("Search by : Video");
    } else {
      setTab("Trending");
    }
  }, [check]);

  const navigate = useNavigate();
  const [logo, setLogo] = useState(false);
  const [inputWd, setInputWd] = useState();
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

      <div
        style={{
          display: "flex",
          margin: "0",
          padding: "0",
          // overflow: "hidden",
        }}
      >
        <Sidebar
          tab={tab}
          setToggle={setToggle}
          setTab={setTab}
          setPlaceHolder={setPlaceHolder}
          trending={trending}
          home={home}
          setLogo={setLogo}
        />
        <div
          className="MainContainer"
          style={{ width: "-webkit-fill-available" }}
        >
          {/* <Heading
            size="lg"
            style={{ textAlign: "center", margin: "2vh", color: "white" }}
          >
            Search Your Youtube Video
          </Heading> */}

          {/* ------------------- Search Group --------------- */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              position: "sticky",
              zIndex: "2",
              top: "0px",
              height: "10vh",
              background: "var(--secondaryBlack)",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* ---------------------hamburger-------------  */}
            <i
              className="fa fa-bars smallNav"
              style={{
                margin: "0 1rem",
                opacity: "0.4",
              }}
            ></i>
            {logo && (
              <div className="logo BigNavlogo" style={{ width: "auto" }}>
                <div className="youtube">
                  <img src={img} alt="" />
                </div>

                <p>YouTool</p>
              </div>
            )}
            {/* ----------------------- Input Group---- ---------------- */}
            <div className="InputGroup">
              <div
                id="historybtn"
                style={{
                  position: "absolute",
                  top: "8vh",
                  left: "0px",
                  // display: "flex",
                  // justifyContent: "center",
                  width: "90%",
                  // height: "20vh",
                  zIndex: "3",
                }}
              >
                {seachHistory && (
                  <div
                    id="S_history"
                    style={{
                      maxHeight: "50vh",
                      color: "white",
                      overflow: "scroll",
                      maxWidth: "600px",
                      padding: "0.5rem 1rem",
                      background: "var(--secondaryBlack)",
                      lineHeight: "2.5",
                    }}
                  >
                    {seachHistory &&
                      seachHistory.map((search, i) => (
                        <div
                          style={{
                            wordBreak: "break-all",
                            fontSize: "small",
                            cursor: "pointer",
                            background: "var(--secondaryBlack)",
                          }}
                          key={i}
                          onClick={() => {
                            setInput(search.id);
                          }}
                        >
                          <i
                            className="fa fa-history "
                            title="More Details"
                            style={{
                              margin: "0 0.5rem 0 0",
                              color: "#5e5",
                            }}
                            // id={`${data.id}button`}
                          ></i>
                          {search.id}
                        </div>
                      ))}
                  </div>
                )}
              </div>

              <input
                className="input"
                id="inpgrp"
                placeholder={placeHolder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    document.getElementById("historybtn").style.display =
                      "none";
                    keySearch(LinkCheck(input));
                    SearchHistory();
                  }
                }}
                onClick={() => {
                  console.log("in");

                  var inp = document.getElementById("inpgrp").offsetWidth;
                  // document.getElementById("S_history").style.width = inp + "px";
                  // document.getElementById("historybtn").click();
                  document.getElementById("historybtn").style.display = "block";

                  console.log(inp, "inx");
                  setInputWd(inp);
                }}
              />
              {/* <button
              style={{
                width: "50px",
                  fontSize: "large",
                  transform: "rotate(45deg)",
                }}
                onClick={() => setInput("")}
              >
                <i className="fa fa-plus"></i>
              </button> */}
              <Button
                colorScheme="blue"
                className="button--submit"
                onClick={async () => {
                  // keySearch();
                  // await LinkCheck(input);
                  document.getElementById("historybtn").style.display = "none";

                  keySearch(LinkCheck(input));
                  SearchHistory();
                }}
              >
                <i className="fa fa-search"></i>
              </Button>
            </div>

            {/* ---------------------- logo ------------------- */}
            {/* <div className="youtube smallNav">
              <img src={img} alt="" />
            </div> */}
          </div>

          {/* --------------- Skeleton Loader ------------ */}
          <Card id="loading" maxW="lg" borderRadius="lg">
            <CardBody>
              <span className="loader"></span>
            </CardBody>
          </Card>

          {/* --------------------Display Results------ ------------- */}
          <div
            className="CardGroup"
            onClick={() => {
              document.getElementById("historybtn").style.display = "none";
            }}
          >
            {/* --------- Skeleton replace Loader-------------- */}
            {loading && (
              <div
                className="loadingHamster"
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  zIndex: "1",
                  height: "auto",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <div
                  aria-label="Orange and tan hamster running in a metal wheel"
                  role="img"
                  className="wheel-and-hamster"
                >
                  <div className="wheel"></div>
                  <div className="hamster">
                    <div className="hamster__body">
                      <div className="hamster__head">
                        <div className="hamster__ear"></div>
                        <div className="hamster__eye"></div>
                        <div className="hamster__nose"></div>
                      </div>
                      <div className="hamster__limb hamster__limb--fr"></div>
                      <div className="hamster__limb hamster__limb--fl"></div>
                      <div className="hamster__limb hamster__limb--br"></div>
                      <div className="hamster__limb hamster__limb--bl"></div>
                      <div className="hamster__tail"></div>
                    </div>
                  </div>
                  <div className="spoke"></div>
                </div>
              </div>
            )}
            {/* -------------------Keyword Search Section-------------------- */}
            {check === 1 ? (
              array.map((data, i) => (
                <div key={i}>
                  {data.pageInfo.totalResults >= 1 ? (
                    <div className="mainCardDiv" style={{ width: "auto" }}>
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
                </div>
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
                fun={toggle3}
              />
            )}

            {/* -------------------------------Trending Section ---------------------------- */}
            {check === 4 && (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/Downloads"
                  element={<Downlods wd={"100%"} ht={"60px"} />}
                />
                <Route
                  path="/History"
                  element={<History wd={"100%"} ht={"60px"} />}
                />
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
