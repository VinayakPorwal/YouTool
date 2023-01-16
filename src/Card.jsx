import React, { useState } from "react";
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
} from "@chakra-ui/react";
import "./App.css";
import DesignCard2 from "./DesignCard2";
import ChannelCard from "./ChannleCard";
import img from "./logopng.png";

function Component(props) {
  const [array, setArray] = useState([]);
  const [check, setCheck] = useState();
  const [deta, setDeta] = useState();
  const [tab, setTab] = useState("Filter");

  const [toggle, setToggle] = useState(2);
  const [input, setInput] = useState(
    "https://www.youtube.com/channel/UCqwUrj10mAEsqezcItqvwEw"
  );
  const [placeHolder, setPlaceHolder] = useState("");
  const count = 15;
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
        console.log(mainData.length, mainData);
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
      console.log("jbaksn", input);
      var inputFilter = input.replace("https://www.youtube.com/watch?v=", "");
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

  return (
    <>
      <div style={{ display: "flex", margin: "0", padding: "0" }}>
        <div className="sideBar">
          <div className="logo">
            <img src={img} alt="" />
            <p>YouTool</p>
          </div>
        </div>
        <div className="MainContainer" style={{ width: "85%" }}>
          <Heading
            size="lg"
            style={{ textAlign: "center", margin: "2vh", color: "white" }}
          >
            Search Your Youtube Video
          </Heading>
          {/* ------------------- Video Search Type Selection --------------- */}
          <div style={{ display: "flex" , flexWrap:"wrap"}}>
            <Menu>
              <MenuButton
                onClick={() => {
                  var button = document.getElementById(`tabselect`);
                  if (button.style.transform === "rotate(180deg)") {
                    button.style.transform = "rotate(0deg)";
                  } else {
                    button.style.transform = "rotate(180deg)";
                  }
                  console.log("done");
                }}
              >
                <i
                  className="fa fa-filter"
                  style={{ fontSize: "smaller", margin: "0 5px" }}
                ></i>
                {tab}{" "}
                <i
                  className="fa fa-chevron-down"
                  style={{ fontSize: "smaller", margin: "0 5px" }}
                  title="Filter"
                  id="tabselect"
                ></i>
              </MenuButton>
              <div style={{ zIndex: "2" }}>
                <MenuList
                  style={{
                    background: "var(--secondaryBlack)",
                    zIndex: "77",
                    position: "absolute",
                  }}
                >
                  <MenuItem
                    className="Tab"
                    onClick={() => {
                      setToggle(1);
                      setTab("Search by : Keyword")
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
                      setTab("Search by : Channel")
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
                      setTab("Search by : Video")
                      setPlaceHolder("https://www.youtube.com/watch?v=");
                    }}
                  >
                    Video Link
                  </MenuItem>
                </MenuList>
              </div>
            </Menu>
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
          {/* <Tabs
            mb="2"
            isFitted
            variant="enclosed"
            style={{ margin: "2vh auto", maxWidth: "1220px" }}
          >
            <TabList>
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
                  setToggle(3);
                  // setInput("");
                  setPlaceHolder("https://www.youtube.com/watch?v=");
                }}
                _selected={{ color: "white", bg: "#252525" }}
              >
                Video Link
              </Tab>
            </TabList>
          </Tabs> */}

          {/* ----------------------- Input Group---- ---------------- */}
          {/* <div className="InputGroup">
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
          </div> */}

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
                        data={data}
                        wd={"310px"}
                        ht={"170px"}
                        key={i}
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
            {check === 2 ? (
              <>
                {array.map((data, i) => (
                  <>
                    {data.pageInfo.totalResults === 1 ? (
                      <>
                        <div
                          key={i}
                          className="mainCardDiv"
                          style={{ width: "auto" }}
                        >
                          <ChannelCard data={data} />
                        </div>
                        <Heading
                          size="md"
                          m="3"
                          style={{ textAlign: "center", width: "100%" }}
                        >
                          Recent Videos
                        </Heading>
                      </>
                    ) : (
                      <div style={{ display: "none" }}> </div>
                    )}
                  </>
                ))}

                <div className="ChannelCardGroup">
                  {deta ? (
                    deta.map((data, i) => (
                      <>
                        <div
                          key={i}
                          className="mainCardDiv"
                          style={{ width: "auto" }}
                        >
                          <DesignCard2
                            toggle={check}
                            fun={toggle3}
                            data={data}
                            wd={"310px"}
                            ht={"170px"}
                          />
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

            {/* ------------------- Video Full view Section--------------------- */}
            {check === 3 ? (
              array.map((data, i) => (
                <>
                  {data.pageInfo.totalResults === 1 ? (
                    <div
                      key={i}
                      className="mainCardDiv"
                      style={{ width: "auto" }}
                    >
                      <DesignCard2
                        toggle={check}
                        data={data}
                        wd={"69vw"}
                        ht={"39vw"}
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

export default Component;
