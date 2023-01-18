import React from "react";
import { Heading } from "@chakra-ui/react";
import DesignCard2 from "../DesignCards/DesignCard2";
import ChannelCard from "../DesignCards/ChannleCard";
function Channel(props) {
    
  return (
    <>
      {props.array.map((data, i) => (
        <>
          {data.pageInfo.totalResults === 1 ? (
            <>
              <div key={i} className="mainCardDiv" style={{ width: "auto" }}>
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
        {props.deta ? (
          props.deta.map((data, i) => (
            <>
              <div key={i} className="mainCardDiv" style={{ width: "auto" }}>
                <DesignCard2
                  toggle={props.check}
                  fun={props.toggle3}
                  api_key={props.api_key}
                  chanFun={props.PassChannel}
                  data={data}
                  wd={"310px"}
                  ht={"170px"}
                  info={{
                    date: data.items[0].snippet.publishedAt,
                    url: data.items[0].snippet.thumbnails.medium.url,
                    views: data.items[0].statistics.viewCount,
                    duration: data.items[0].contentDetails.duration,

                    id: data.items[0].id,
                    channelTitle: data.items[0].snippet.channelTitle,
                    likes: data.items[0].statistics.likeCount,
                    comments: data.items[0].statistics.commentCount,
                    description: data.items[0].snippet.localized.description,
                    channelId: data.items[0].snippet.channelId,
                    title: data.items[0].snippet.localized.title,
                  }}
                />
              </div>
            </>
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Channel;
