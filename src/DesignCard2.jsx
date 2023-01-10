import React from "react";
import { Text } from "@chakra-ui/react";
function DesignCard2(props) {
  const data = props.data;

  return (
    <div class="card2">
      <div class="card-image">
        <img src={data.items[0].snippet.thumbnails.standard.url} alt="" />
        <Text
        fontSize="xs"
          style={{
            position: "absolute",
            margin: "-45px 0px 0px 2vw",
            background: "white",
            color:"black",
            padding: "2px 4px",
            display: "inline-block",
            fontWeight: "700",
            borderRadius: "5px",
          }}
        >
          {data.items[0].contentDetails.duration.slice(2, 8)}
        </Text>
      </div>
      <div class="category"> {data.items[0].statistics.viewCount} Views </div>
      <div class="heading"> {data.items[0].snippet.localized.title}</div>
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
      <div class="heading">
        <div class="author">
          By <span class="name">Abi</span> 4 days ago
        </div>
      </div>
    </div>
  );
}

export default DesignCard2;
