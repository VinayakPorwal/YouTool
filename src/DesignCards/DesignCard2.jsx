import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Text,
  Kbd,
  useToast,
  Code,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Avatar,
  AvatarBadge,
  AvatarGroup,
} from "@chakra-ui/react";
function DesignCard2(props) {
  const [Download, setDownload] = useState();
  const [urlPlayer, setUrlPlayer] = useState();
  const [video, setVideo] = useState(false);
  const data = props.info;
  const toast = useToast();
  const [styling, setStyling] = useState({});
  var channelData = "";
  const [Channelimg, setChannelimg] = useState("");
  const ChannelById = async () => {
    channelData = await props.chanFun(data.channelId);
    setChannelimg(channelData.items[0].snippet.thumbnails.default.url);
  };

  // const ChannelById = async () => {
  //   const response = await fetch(
  //     `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${props.channelId}&key=${props.api_key}`
  //   );

  //   channelData = await response.json();
  //   setChannelimg(channelData.items[0].snippet.thumbnails.default.url);
  //   console.log(Channelimg);
  // };

  const StringWithColons = (string) => {
    //PT02S
    let hours, minutes, seconds;
    if (string.includes("H")) {
      hours = string.slice(2, string.indexOf("H"));
    } else {
      hours = false;
    }
    if (string.includes("S")) {
      // checks if number is one-digit and inserts 0 in front of it
      if (isNaN(parseInt(string.charAt(string.indexOf("S") - 2)))) {
        seconds = "0" + string.charAt(string.indexOf("S") - 1);
      } else {
        seconds = string.slice(-3, -1);
      }
    } else {
      seconds = "00";
    }
    // determines how minutes are displayed, based on existence of hours and minutes
    if (hours) {
      if (string.includes("M")) {
        if (string.indexOf("M") - string.indexOf("H") === 3) {
          minutes = string.slice(string.indexOf("H") + 1, string.indexOf("M"));
        } else {
          minutes = "0" + string.charAt(string.indexOf("M") - 1);
        }
      } else {
        minutes = "00";
      }
    } else {
      if (string.includes("M")) {
        minutes = string.slice(2, string.indexOf("M"));
      } else {
        minutes = "0";
      }
    }

    return `${hours ? hours + ":" : ""}${minutes}:${seconds}`;
  };

  var title = data.title;


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
  let date = data.date;
  date = new Date(date);
  var ActualDate = date.toISOString().substring(0, 10);

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

  function Details() {
    var metadata = document.getElementById(`${data.id}`);
    var button = document.getElementById(`${data.id}button`);
    if (metadata.style.display === "none") {
      metadata.style.display = "block";
      button.style.transform = "rotate(0)";
    } else {
      metadata.style.display = "none";
      button.style.transform = "rotate(180deg)";
    }
    console.log("done");
  }

  async function download() {
    const response = await fetch(
      `https://server-ten-iota.vercel.app/download/?url=https://www.youtube.com/watch?v=${data.id}`,
      {
        // mode: "no-cors",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      }
    );
    const data2 = await response.json();
    setDownload(data2.info);
    setUrlPlayer(data2.url);
  }
  useEffect(() => {
    ChannelById();
    // Channelimg = channelData.items[0].snippet.thumbnails.medium.url;

    console.log(props.toggle);
    if (props.toggle === 3) {
      setStyling({
        height: "60vw",
        width: "85vw",
      });
    } else {
      setStyling({
        width: props.wd,
        height: "fit-content",
      });
    }

    download();
  }, []);

  const minW = "310px";
  const minH = "170px";
  return (
    <div className="card2" style={{ width: props.wd }}>
      <div
        className="card2-image"
        onMouseOver={() => {
          document.getElementById(`${data.id}hover`).style.display = "flex";
        }}
        onMouseOut={() => {
          document.getElementById(`${data.id}hover`).style.display = "none";
        }}
      >
        {/* -------------------Image Section ------------------ */}
        {!video && (
          <>
            <img
              src={data.url}
              alt=""
              onClick={() => {
                setVideo(true);
              }}
              style={{ width: props.wd, height: props.ht, objectFit: "cover" }}
            />

            {/* ----------------------Duration Stamp -------------- */}
            <Text
              fontSize="xs"
              className="duration"
              style={{ width: props.wd }}
            >
              {" "}
              <span>{StringWithColons(data.duration)}</span>
            </Text>
          </>
        )}

        {/* --------------------- Video Section ------------------ */}
        {video && (
          <iframe
            className="d-flex"
            style={{
              width: props.wd,
              height: props.ht,
              minWidth: minW,
              minHeight: minH,
            }}
            //for video not from Youtube
            // src={Download[0].url}
            // for video from Youtube
            src={urlPlayer}
          ></iframe>
        )}

        {/* ----------------------On Hover 'Click to play' Display ---------------- */}
        {!video && (
          <div
            onClick={() => setVideo(true)}
            id={`${data.id}hover`}
            className="hoverButton"
            style={{
              width: props.wd,
              height: props.ht,
              minWidth: minW,
              minHeight: minH,
              margin: `-${props.ht} 0 0 -3px`,
            }}
          >
            <i className="fa fa-play"></i>
            <Text
              fontSize="xs"
              style={{
                fontFamily: "monospace",
              }}
            >
              Click To Play
            </Text>
          </div>
        )}
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
          {convertToInternational(data.views)} {"views"} • {date}
        </div>

        {/* ------------------Right button group - download , details , expand-------------  */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "40px",
          }}
        >
          {/* -------------------------Extend View Open in Large--------------------*/}
          <i
            className="fa fa-expand"
            title="Open In Large"
            onClick={() => {
              props.fun(data.id);
            }}
          ></i>

          {/* -------------------------Download Button----------------------  */}
          <Menu>
            <MenuButton onClick={download} title="Download">
              {/* <i className="fa fa-download"></i> */}
              <i
                className="fa fa-arrow-down"
                style={{ borderBottom: "2px solid white" }}
              ></i>
            </MenuButton>
            <MenuList style={{ height: "50vh", overflow: "scroll" }}>
              {Download &&
                Download.map((format, i) => (
                  <MenuItem
                    key={i}
                    onClick={() => {
                      var downlaoadData = JSON.parse(
                        localStorage.getItem("Downloads")
                      );
                      if (downlaoadData) {
                        var newArr = downlaoadData.filter((downlaoadData) => {
                          return downlaoadData.id !== data.id;
                        });
                        if (downlaoadData.length !== newArr.length) {
                          console.log("Already Exists");
                          return;
                        } else {
                          downlaoadData.push({
                            id: data.id,
                          });

                          localStorage.setItem(
                            "Downloads",
                            JSON.stringify(downlaoadData)
                          );
                        }
                      } else {
                        downlaoadData = [];
                        downlaoadData.push({
                          id: data.id,
                        });
                        localStorage.setItem(
                          "Downloads",
                          JSON.stringify(downlaoadData)
                        );
                        console.log("Key not found");
                      }
                    }}
                  >
                    Download
                    {format && (
                      <a href={format.url} download>
                        {format.mimeType.split(";")[0]}{" "}
                        {format.hasVideo ? format.height + "p" : ""}
                        {!format.hasAudio && (
                          <i className="fas fa-volume-mute text-danger"></i>
                        )}
                      </a>
                    )}
                  </MenuItem>
                ))}
            </MenuList>
          </Menu>
        </div>
      </div>

      {/* --------------------------------- Title logo and Links --------------------------- */}
      <div
        style={{
          display: "flex",
          width: props.wd,
          minWidth: minW,
          padding: "0 15px 0 0",
        }}
      >
        <div>
          {/* --------------------------------- Channel logo --------------------------- */}
          <Avatar mt="2" size="sm" name="Dan Abrahmov" src={Channelimg} />
        </div>
        <div style={{ width: "85%" }}>
          {/* --------------------------------- Channel Title --------------------------- */}
          <div className="channelName" title={data.channelTitle}>
            {data.channelTitle}
          </div>
          {/* --------------------------------- Title --------------------------- */}
          <div className="heading title" title={title}>
            {title}
          </div>
        </div>
        {/* ----------------------Details Acordian button-----------------  */}
        <div style={{ width: "5%", textAlign: "end" }}>
          <Menu>
            {props.toggle !== 3 && (
              <MenuButton
                title="Details"
                onClick={() => {
                  var button = document.getElementById(`${data.id}button`);
                  if (button.style.transform === "rotate(0deg)") {
                    button.style.transform = "rotate(180deg)";
                  } else {
                    button.style.transform = "rotate(0deg)";
                  }
                  console.log("done");
                }}
              >
                <i
                  className="fa fa-chevron-up detailsButton"
                  title="More Details"
                  id={`${data.id}button`}
                ></i>
              </MenuButton>
            )}
            {props.toggle === 3 && (
              <i
                className="fa fa-chevron-up detailsButton"
                title="More Details"
                onClick={Details}
                id={`${data.id}button`}
              ></i>
            )}

            {/* ------------------------------ Details Container ----------------------- */}

            <MenuList
              style={{ height: "40vh", width: props.wd, overflow: "scroll" }}
            >
              {/* ---------------------------- Published Date ---------------------------- */}
              <MenuItem>
                <div className="heading">
                  <div className="author" style={{ padding: "0" }}>
                    <span className="name">Published At : </span> {ActualDate}
                  </div>
                </div>
              </MenuItem>
              {/* ---------------------------- like and Comment Count -------------------- */}
              <MenuItem>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    padding: "5px",
                    width: props.wd,
                  }}
                >
                  <Text
                    color="blue.600"
                    fontSize="xs"
                    as="b"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center",
                    }}
                  >
                    {data.likes}
                    <span style={{ color: "black", fontSize: "x-small" }}>
                      Likes
                    </span>
                  </Text>
                  <Text
                    color="blue.600"
                    fontSize="xs"
                    as="b"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center",
                    }}
                  >
                    {data.comments}
                    <span style={{ color: "black", fontSize: "x-small" }}>
                      Comments
                    </span>
                  </Text>
                </div>
              </MenuItem>

              {/* -------------------------Copy Link buttons-----------------------  */}
              {/* ---------------------------- Channel Link ------------------------ */}
              <div
                style={{
                  fontSize: "small",
                  color: "black",
                  textAlign: "start",
                  margin: "1rem",
                }}
              >
                Channel Link :
                <div style={{ display: "flex" }}>
                  <i
                    className="fa fa-copy"
                    style={{
                      margin: "5px",
                      color: "black",
                      cursor: "pointer",
                      fontSize: "large",
                    }}
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `https://www.youtube.com/channel/${data.channelId}`
                      );
                      toast({
                        title: "Link Copied.",
                        description: "We've Copied your Link for you.",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                      });
                    }}
                  ></i>
                  <div
                    style={{
                      width: "90%",
                      wordBreak: "break-all",
                      fontSize: "x-small",
                      background: "#f0f0f0",
                    }}
                  >
                    {`https://www.youtube.com/channel/${data.channelId}`}
                  </div>
                </div>
              </div>

              {/* ---------------------------- Video Link ------------------------ */}
              <div
                style={{
                  fontSize: "small",
                  color: "black",
                  textAlign: "start",
                  margin: "1rem",
                }}
              >
                Video Link :{" "}
                <div style={{ display: "flex" }}>
                  <i
                    className="fa fa-copy"
                    style={{
                      margin: "5px",
                      color: "black",
                      cursor: "pointer",
                      fontSize: "large",
                    }}
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `https://www.youtube.com/watch?v=${data.id}`
                      );
                      toast({
                        title: "Link Copied.",
                        description: "We've Copied your Link for you.",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                      });
                    }}
                  ></i>
                  <div
                    style={{
                      width: "90%",
                      wordBreak: "break-all",
                      fontSize: "x-small",
                      background: "#f0f0f0",
                    }}
                  >
                    {`https://www.youtube.com/watch?v=${data.id}`}
                  </div>
                </div>
              </div>
            </MenuList>
          </Menu>
        </div>
      </div>

      {/* ---------------------------------------Full Video View---------------------------------  */}
      {props.toggle === 3 && (
        <div
          id={`${data.id}`}
          key={props.key}
          style={{
            // display: "none",
            height: "auto",
            padding: "1vw 1vw",
          }}
        >
          {/* ---------------------------- Published Date ---------------------------- */}
          <div className="heading">
            <div className="author" style={{ padding: "0" }}>
              <span className="name">Published At : </span> {ActualDate}
            </div>
          </div>
          {/* ---------------------------- like and Comment Count -------------------- */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              padding: "10px 5px",
              width: props.wd,
              minWidth: "310px",
            }}
          >
            <Text
              color="blue.600"
              fontSize="xs"
              as="b"
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              {data.likes}
              <span style={{ color: "white", fontSize: "x-small" }}>Likes</span>
            </Text>
            <Text
              color="blue.600"
              fontSize="xs"
              as="b"
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              {data.comments}
              <span style={{ color: "white", fontSize: "x-small" }}>
                Comments
              </span>
            </Text>
          </div>
          {/* ---------------------- Description ------------------ */}
          {props.toggle === 3 && (
            <>
              <span className="author" style={{ fontWeight: "bold" }}>
                Description :{" "}
              </span>
              <Text fontSize="xs"> {data.description}</Text>
            </>
          )}
          {/* -------------------------Copy Link buttons-----------------------  */}
          {/* ---------------------------- Channel Link ------------------------ */}
          <div
            style={{
              fontSize: "small",
              color: "white",
              textAlign: "start",
              margin: "2rem",
            }}
          >
            Channel Link :
            <div style={{ display: "flex" }}>
              <i
                className="fa fa-copy"
                style={{
                  margin: "5px",
                  cursor: "pointer",
                  fontSize: "large",
                }}
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://www.youtube.com/channel/${data.channelId}`
                  );
                  toast({
                    title: "Link Copied.",
                    description: "We've Copied your Link for you.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  });
                }}
              ></i>
              <div
                style={{
                  display: "flex",
                  width: "90%",
                  alignItems: "center",
                  background: "var(--secondaryBlack)",
                  color: "white",
                  fontSize: "x-small",
                  wordBreak: "break-all",
                }}
              >
                {`https://www.youtube.com/channel/${data.channelId}`}
              </div>
            </div>
          </div>

          {/* ---------------------------- Video Link ------------------------ */}
          <div
            style={{
              fontSize: "small",
              color: "white",
              textAlign: "start",
              margin: "2rem",
            }}
          >
            Video Link :{" "}
            <div style={{ display: "flex" }}>
              <i
                className="fa fa-copy"
                style={{
                  margin: "5px",
                  cursor: "pointer",
                  fontSize: "large",
                }}
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://www.youtube.com/watch?v=${data.id}`
                  );
                  toast({
                    title: "Link Copied.",
                    description: "We've Copied your Link for you.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  });
                }}
              ></i>
              <div
                style={{
                  display: "flex",
                  width: "90%",
                  alignItems: "center",
                  fontSize: "x-small",
                  color: "white",
                  background: "var(--secondaryBlack)",
                }}
              >
                {`https://www.youtube.com/watch?v=${data.id}`}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DesignCard2;
