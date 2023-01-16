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
  if (title.length > 165) {
    title = title.slice(0, 65) + "...";
  }

  let date = data.date;
  date = new Date(date);
  var ActualDate = date.toISOString().substring(0, 10);

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
  var date2 = new Date();

  var time_difference = date2.getTime() - date.getTime();

  //calculate days difference by dividing total milliseconds in a day
  var days_difference = time_difference / (1000 * 60 * 60 * 24);
  days_difference = Math.floor(days_difference);

  if (days_difference > 365) {
    date = Math.floor(days_difference / 365) + " year ago";
  } else if (days_difference > 30) {
    date = Math.floor(days_difference / 30) + " month ago";
  } else if (days_difference > 7) {
    date = Math.floor(days_difference / 7) + " week ago";
  } else {
    date = days_difference + " day ago";
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
      `https://server-ten-iota.vercel.app/download/?url=https://www.youtube.com/watch?v=${data.id}`
    );
    const data2 = await response.json();
    setDownload(data2.info);
    setUrlPlayer(data2.url);
  }
  useEffect(() => {
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
  return (
    <div className="card2" style={{ width: props.wd }}>
      <div className="card-image">
        {/* -------------------Image Section ------------------ */}
        {!video && (
          <>
            <img
              src={data.url}
              alt=""
              onClick={() => {
                setVideo(true);
              }}
              onMouseOver={() => {
                document.getElementById(
                  `${data.id}hover`
                ).style.display = "flex";
              }}
              onMouseOut={() => {
                document.getElementById(
                  `${data.id}hover`
                ).style.display = "none";
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
              <p>{StringWithColons(data.duration)}</p>
            </Text>
          </>
        )}

        {/* --------------------- Video Section ------------------ */}
        {video && (
          <iframe
            className="d-flex"
            style={{ width: props.wd, height: props.ht }}
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
              margin: `-${props.ht} 0 0 -3px`,
            }}
          >
            <i class="fa fa-play"></i>
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
            class="fa fa-solid fa-eye"
            style={{ margin: "0 4px 0 0", color: "inherit" }}
          ></i>
          {convertToInternational(data.views)} {"views"}{" "}
          • {date}
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
            class="fa fa-expand"
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
                class="fa fa-arrow-down"
                style={{ borderBottom: "2px solid white" }}
              ></i>
            </MenuButton>
            <MenuList style={{ height: "50vh", overflow: "scroll" }}>
              {Download &&
                Download.map((format, i) => (
                  <MenuItem key={i}>
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
      <div style={{ display: "flex", width: props.wd, padding: "0 10px 0 0" }}>
        <div>
          {/* --------------------------------- Channel logo !pending --------------------------- */}
          <Avatar
            mt="2"
            size="sm"
            name="Dan Abrahmov"
            src="https://bit.ly/dan-abramov"
          />
        </div>
        <div style={{ width: "95%" }}>
          {/* --------------------------------- Channel Title --------------------------- */}
          <div
            className="channelName"
            title={data.channelTitle}
          >
            {data.channelTitle}
          </div>
          {/* --------------------------------- Title --------------------------- */}
          <div
            className="heading title"
            style={{
              paddingTop: "0px",
            }}
            title={title}
          >
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
                  var button = document.getElementById(
                    `${data.id}button`
                  );
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
                    <Text color="black" fontSize="xm">
                      Likes
                    </Text>
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
                    <Text color="black" fontSize="xs">
                      Comments
                    </Text>
                  </Text>
                </div>
              </MenuItem>
              {/* ---------------------- Description ------------------ */}
              <MenuItem>
                {props.toggle === 3 && (
                  <Text fontSize="sm">
                    {" "}
                    {data.description}
                  </Text>
                )}
              </MenuItem>
              {/* -------------------------Copy Link buttons-----------------------  */}
              {/* ---------------------------- Channel Link ------------------------ */}
              <Text color="black" fontSize="sm" m={2} textAlign="start">
                Channel Link :
                <div style={{ display: "flex" }}>
                  <i
                    class="fa fa-copy"
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
                      fontSize: "x-small",
                      background: "#f0f0f0",
                    }}
                  >
                    {`https://www.youtube.com/channel/${data.channelId}`}
                  </div>
                </div>
              </Text>

              {/* ---------------------------- Video Link ------------------------ */}
              <Text color="black" fontSize="sm" m={2} textAlign="start">
                Video Link :{" "}
                <div style={{ display: "flex" }}>
                  <i
                    class="fa fa-copy"
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
                      display: "flex",
                      width: "90%",
                      alignItems: "center",
                      fontSize: "x-small",
                      background: "#f0f0f0",
                    }}
                  >
                    {`https://www.youtube.com/watch?v=${data.id}`}
                  </div>
                </div>
              </Text>
            </MenuList>
          </Menu>
        </div>
      </div>

      {props.toggle === 3 && (
        <div
          id={`${data.items[0].id}`}
          key={props.key}
          style={{
            // display: "none",
            height: "auto",
            padding: "1vw 2vw",
            overflow: "scroll",
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
              <Text color="black" fontSize="xm">
                Likes
              </Text>
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
              <Text color="black" fontSize="xs">
                Comments
              </Text>
            </Text>
          </div>
          {/* ---------------------- Description ------------------ */}
          {props.toggle === 3 && (
            <Text fontSize="sm">
              {" "}
              {data.description}
            </Text>
          )}
          {/* -------------------------Copy Link buttons-----------------------  */}
          {/* ---------------------------- Channel Link ------------------------ */}
          <Text color="white" fontSize="sm" m={2} textAlign="start">
            Channel Link :
            <div style={{ display: "flex" }}>
              <i
                class="fa fa-copy"
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
                }}
              >
                {`https://www.youtube.com/channel/${data.channelId}`}
              </div>
            </div>
          </Text>

          {/* ---------------------------- Video Link ------------------------ */}
          <Text color="white" fontSize="sm" m={2} textAlign="start">
            Video Link :{" "}
            <div style={{ display: "flex" }}>
              <i
                class="fa fa-copy"
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
          </Text>
        </div>
      )}
    </div>
  );
}

export default DesignCard2;
