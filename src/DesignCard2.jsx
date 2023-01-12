import React from "react";
import { format } from "date-fns";
import { Text } from "@chakra-ui/react";
function DesignCard2(props) {
  const data = props.data;

  let duration = data.items[0].contentDetails.duration.slice(2, 8);
  duration = duration.replace(/\D/g, ":");
  duration = duration.slice(0, -1);

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
    if ( metadata.style.display===  "none") 
    {metadata.style.display=  "block";
    button.style.transform ="rotate(0)"}
    else {metadata.style.display=  "none";
    button.style.transform ="rotate(180deg)"}
    console.log("done")
  }
  return (
    <div className="card2" style={{ width: props.wd }} key={props.key}>
      <div className="card-image">
        <img src={data.items[0].snippet.thumbnails.standard.url} alt="" />
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
          {duration}
        </Text>
      </div>
      <div
        className="category"
        style={{ display: "flex", justifyContent: "space-between",alignItems:"center", height:"2vh" ,    margin: "4px 0"}}
      >
        {" "}
        <div>
          {convertToInternational(data.items[0].statistics.viewCount)} Views{" "}
        </div>
        <button onClick={Details} style={{fontSize: "small", color:"black",transform:"rotate(180deg)", transition:"0.5s"}} id={`${data.items[0].id}button`}>^</button>
      </div>
      <div className="heading"> {data.items[0].snippet.localized.title}</div>
      <div id={`${data.items[0].id}`} key={props.key} style={{display:"none"}}>
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
