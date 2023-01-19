import React from "react";
import DesignCard2 from "../DesignCards/DesignCard2";
import { Heading } from "@chakra-ui/react";

function Trending(props) {
  return (
    <>
      <Heading
        size="lg"
        m="3"
        style={{
          alignItems: "center",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: "xxx-large",
            display: "flex",
            alignItems: "center",
            color: "#3f79e6",
            padding: "5px",
          }}
        >
          #15{" "}
        </span>
        Trending
      </Heading>
      {props.array.map((data, i) => (
        <div key={data.id}>
          {data && (
            <div className="mainCardDiv" style={{ width: "auto" }}>
              <DesignCard2
                fun={props.toggle3}
                api_key={props.api_key}
                chanFun={props.PassChannel}
                toggle={props.check}
                wd={"310px"}
                ht={"170px"}
                info={{
                  date: data.snippet.publishedAt,
                  url: data.snippet.thumbnails.standard.url,
                  views: data.statistics.viewCount,
                  id: data.id,
                  channelTitle: data.snippet.channelTitle,
                  duration: data.contentDetails.duration,

                  likes: data.statistics.likeCount,
                  comments: data.statistics.commentCount,
                  description: data.snippet.localized.description,
                  channelId: data.snippet.channelId,
                  title: data.snippet.localized.title,
                }}
              />
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default Trending;
