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
} from "@chakra-ui/react";
function DesignCard2(props) {
  const [Download, setDownload] = useState();
  const [urlPlayer, setUrlPlayer] = useState();
  const [video, setVideo] = useState(false);
  const data = props.data;
  const toast = useToast();

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

  let date = data.items[0].snippet.publishedAt;
  date = new Date(date);
  date = date.toISOString().substring(0, 10);

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

  function Details() {
    var metadata = document.getElementById(`${data.items[0].id}`);
    var button = document.getElementById(`${data.items[0].id}button`);
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
    console.log(data.items[0].id);
    const response = await fetch(
      `https://server-ten-iota.vercel.app/download/?url=https://www.youtube.com/watch?v=${data.items[0].id}`
    );
    const data2 = await response.json();
    console.log(data2.info);
    setDownload(data2.info);
    setUrlPlayer(data2.url);
    console.log(urlPlayer);
  }
  useEffect(() => {
    download();
  }, []);
  return (
    <div className="card2" style={{ width: props.wd }}>
      <div className="card-image">
       { !video && <img
          src={data.items[0].snippet.thumbnails.standard.url}
          alt=""
          onClick={() => props.fun(data.items[0].id)}
        />}
       
      {video && 
         <iframe
         className="d-flex"
         width={props.wd}
         src={urlPlayer}
         ></iframe>
        }
        <Text
          fontSize="xs"
          style={{
            position: "absolute",
            margin: "-45px 0px 0px 2vw",
            background: "white",
            color: "black",
            padding: "2px 4px",
            display: "inline-block",
            fontWeight: "700",
            borderRadius: "5px",
          }}
        >
          {" "}
          {StringWithColons(data.items[0].contentDetails.duration)}
        </Text>
      </div>
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
        <div>
          <i class="fa fa-solid fa-eye" style={{ margin: "0 4px 0 0" }}></i>
          {convertToInternational(data.items[0].statistics.viewCount)} {""}
        </div>
        <div>
        <i class="fa fa-play" onClick={()=>{
          setVideo(true)
        }}></i>
          <Menu>
            <MenuButton onClick={download}>
              <i
                className="fa fa-download"
                style={{ color: "black", margin: "0 8px" }}
              ></i>
            </MenuButton>
            <MenuList style={{ height: "50vh", overflow: "scroll" }}>
              {Download &&
                Download.map((format, i) => (
                  <MenuItem key={i}>
                    Download
                    <a href={format.url} download>
                      {format.mimeType.split(";")[0]}{" "}
                      {format.hasVideo ? format.height + "p" : ""}
                      {!format.hasAudio && (
                        <i className="fas fa-volume-mute text-danger"></i>
                      )}
                    </a>
                  </MenuItem>
                ))}
            </MenuList>
          </Menu>
          <button
            onClick={Details}
            style={{
              fontSize: "small",
              color: "black",
              display: "inline-flex",
              transform: "rotate(180deg)",
              transition: "0.5s",
            }}
            id={`${data.items[0].id}button`}
          >
            <i className="fa fa-chevron-up"></i>
          </button>
        </div>
      </div>
      <div className="heading"> {data.items[0].snippet.localized.title}</div>
      <div
        id={`${data.items[0].id}`}
        key={props.key}
        style={{ display: "none" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            padding: "5px",
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
            {data.items[0].statistics.likeCount}
            <Text color="black" fontSize="xm">
              {" "}
              Likes{" "}
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
            {data.items[0].statistics.commentCount}
            <Text color="black" fontSize="xs">
              {" "}
              Comments{" "}
            </Text>
          </Text>
        </div>

        <Text color="black" fontSize="sm">
          Channel Link :
          {/* <Kbd>
            https://www.youtube.com/channel/
            {data.items[0].snippet.channelId}
          </Kbd> */}
          <div style={{ display: "flex", width: "160px" }}>
            <button
              style={{
                padding: "0 3px",
                margin: "3px",
                fontStyle: "italic",
                // background: "#4299e199",
                borderRadius: "4px",
                fontSize: "Smaller",
              }}
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://www.youtube.com/channel/${data.items[0].snippet.channelId}`
                );
                toast({
                  title: "Link Copied.",
                  description: "We've Copied your Link for you.",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                });
              }}
            >
              <i class="fa fa-copy" style={{ fontSize: "large" }}></i>
            </button>
            <div
              style={{
                width: "-webkit-fill-available",
                fontSize: "x-small",
                background: "#f0f0f0",
              }}
            >
              {`https://www.youtube.com/channel/${data.items[0].snippet.channelId}`}
            </div>
          </div>
        </Text>
        <Text color="black" fontSize="sm">
          Video Link :{" "}
          {/* <Kbd>https://www.youtube.com/watch?v={data.items[0].id}</Kbd> */}
          <div style={{ display: "flex" }}>
            <button
              style={{
                padding: "0 3px",
                margin: "3px",
                fontStyle: "italic",
                // background: "#4299e199",
                borderRadius: "4px",
                // fontSize: "",
              }}
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://www.youtube.com/watch?v=${data.items[0].id}`
                );
                toast({
                  title: "Link Copied.",
                  description: "We've Copied your Link for you.",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                });
              }}
            >
              <i class="fa fa-copy" style={{ fontSize: "large" }}></i>
            </button>
            <div
              style={{
                width: "-webkit-fill-available",
                fontSize: "x-small",
                background: "#f0f0f0",
              }}
            >
              {`https://www.youtube.com/watch?v=${data.items[0].id}`}
            </div>
          </div>
        </Text>
        <div className="heading">
          <div className="author">
            <span className="name">Published At : </span> {date}
            {/* By <span class="name">Abi</span> 4 days ago */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesignCard2;
