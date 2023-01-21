import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  Avatar,
} from "@chakra-ui/react";
function History(props) {
  var data = JSON.parse(localStorage.getItem("WatchHistory"));
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(false);
  //   const [download, setDownload] = useState();
  var temp = [];
  async function downloadData() {
    temp = [];
    setLoading(true);
    if (data) {
      data.map(async (child, i) => {
        await get(child.id);
        console.log(i, temp.length, data.length);
        if (data.length === temp.length) {
          setDownloads(temp);
          console.log(downloads, temp, data);
          setLoading(false);
        }
      });
    } else {
      setLoading(false);
    }
    // console.log(temp, temp.length);
  }

  async function get(id) {
    const response = await fetch(
      `https://server-ten-iota.vercel.app/download/?url=https://www.youtube.com/watch?v=${id}`,
      {
        // mode: "no-cors",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      }
    );
    const info = await response.json();
    temp.push(info.data);
    // setDownloads(temp);
  }

  function second_to_minute(i) {
    var sec = i % 60;
    var min = 0;
    var hr = 0;

    min = Math.floor(i / 60);
    if (min > 59) {
      hr = Math.floor(min / 60);
      min = min % 60;
    }
    if (sec < 10) sec = "0" + sec;
    if (min < 10) min = "0" + min;
    // if (sec<10) sec="0"+sec;
    if (hr === 0) return min + ":" + sec;
    else return hr + ":" + min + ":" + sec;
  }

  function convertToInternational(labelValue) {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e9
      ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + "B"
      : // Six Zeroes for Millions
      Math.abs(Number(labelValue)) >= 1.0e6
      ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + "M"
      : // Three Zeroes for Thousands
      Math.abs(Number(labelValue)) >= 1.0e3
      ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + "K"
      : Math.abs(Number(labelValue));
  }

  function DateIntoDuration(date1) {
    var date = new Date(date1);
    var date2 = new Date();

    var time_difference = date2.getTime() - date.getTime();

    //calculate days difference by dividing total milliseconds in a day
    var days_difference = time_difference / (1000 * 60 * 60 * 24);
    days_difference = Math.floor(days_difference);

    if (days_difference > 365) {
      if (Math.floor(days_difference / 365) === 1) {
        date = Math.floor(days_difference / 365) + " year ago";
      } else {
        date = Math.floor(days_difference / 365) + " years ago";
      }
    } else if (days_difference > 30) {
      if (Math.floor(days_difference / 30) === 1) {
        date = Math.floor(days_difference / 30) + " month ago";
      } else {
        date = Math.floor(days_difference / 30) + " months ago";
      }
    } else if (days_difference > 7) {
      if (Math.floor(days_difference / 7) === 1) {
        date = Math.floor(days_difference / 7) + " week ago";
      } else {
        date = Math.floor(days_difference / 7) + " weeks ago";
      }
    } else {
      if (days_difference === 0) date = "Today";
      else if (days_difference === 1) {
        date = days_difference + " day ago";
      } else {
        date = days_difference + " days ago";
      }
    }
    return date;
  }
  useEffect(() => {
    downloadData();
  }, []);
  return (
    <div style={{ minHeight: "82vh" }}>
      <Heading
        size="lg"
        my="3"
        style={{
          alignItems: "center",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        Watch History
      </Heading>
      {loading && (
        <div
          className="loadingHamster"
          style={{
            display: "flex",
            justifyContent: "center",
            zIndex: "1",
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
      { data &&
        downloads.
        slice(0, data.length).
        map((data, i) => (
          <Card
            direction={{ base: "column", sm: "row" }}
            variant="none"
            my={4}
            px={1}
            key={i}
            maxW={"870px"}
          >
            <div
              className=""
              style={{ display: "flex" , width:"-webkit-fill-available"}}
              // onMouseOver={() => {
              //   document.getElementById(`${"data.id"}hover`).style.display =
              //     "flex";
              // }}
              // onMouseOut={() => {
              //   document.getElementById(`${"data.id"}hover`).style.display =
              //     "none";
              // }}
            >
              {/* -------------------Image Section ------------------ */}
              {
                // {!video && (
                <div>
                  <img
                    // src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=1600&q=60"
                    src={data.thumbnails[2].url}
                    alt=""
                    // onClick={() => {
                    //   setVideo(true);
                    // }}
                    onClick={() => {
                      // if (click) setClick(false);
                      // else setClick(true);
                      //   RelatedVideos(data.id);
                      //   props.fun(data.id);
                    }}
                    style={{
                      //   minWidth: props.wd,
                      width: "150px",
                      //   minHeight: props.ht,
                      objectFit: "cover",
                    }}
                  />

                  {/* ----------------------Duration Stamp -------------- */}
                  <Text
                    fontSize="xs"
                    className="duration"
                    style={{
                      width: props.wd,
                      justifyContent: "start",
                      margin: "-4vh 0px 0px 100px",
                      maxWidth: "120px",
                    }}
                  >
                    <span>{second_to_minute(data.lengthSeconds)}</span>
                  </Text>
                </div>
              }

              <CardBody p="0">
                <div
                  style={{
                    display: "flex",
                    maxWidth: "800px",
                    padding: "0 0px 0 0",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ maxWidth: "600px" ,  width: "-webkit-fill-available", }}>
                    {/* --------------------------------- Title --------------------------- */}
                    <div
                      className="heading title"
                      title={data.title}
                      style={{ lineHeight: "1.2rem" }}
                    >
                      {data.title}
                    </div>
                    {/* --------------------------------- Channel Title --------------------------- */}
                    <div className="channelName" title={data.author.name}>
                      {/* anKAN */}
                      {data.author.name}
                    </div>
                  </div>
                  <div style={{ width: "", textAlign: "end" }}>
                    <i
                      className="fa fa-history "
                      title="More Details"
                      style={{ margin: "0",color:"#5e5" }}
                      // id={`${data.id}button`}
                    ></i>
                  </div>
                </div>

                {/* ------------------Stats And Tool Buttons Group -------------- */}
                <div
                  className="category"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "2vh",
                    margin: "4px 0",
                  }}
                >
                  {/* --------------------------View Count-----------------  */}
                  <div>
                    <i
                      className="fa fa-solid fa-eye"
                      style={{ margin: "0 4px 0 0", color: "inherit" }}
                    ></i>
                    {convertToInternational(data.viewCount)} •{" "}
                    {DateIntoDuration(data.publishDate)}
                  </div>
                </div>
              </CardBody>
            </div>
          </Card>
        ))}
         {!data && (
        <Heading
          size="md"
          my="3"
          style={{
            alignItems: "center",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          No history yet!
        </Heading>
      )}
    </div>
  );
}

export default History;
