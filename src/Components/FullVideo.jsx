import React from "react";
import DesignCard2 from "../DesignCards/DesignCard2";
import RelatedVideosCard from "../DesignCards/RelatedInfoCard";

function FullVideo(props) {
  var data = props.array[0];
  var toggle = props.fun
  return (
    <>
      {" "}
      {/* {props.array.map((data, i) => ( */}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {data && (
          <div
            className="mainCardDiv"
            style={{ width: "auto", margin: "0 auto" }}
          >
            <DesignCard2
              toggle={props.check}
              api_key={props.api_key}
              chanFun={props.PassChannel}
              // wd={"69vw"}
              // ht={"39vw"}
              wd={"49vw"}
              ht={"28vw"}
              info={{
                date: data.items[0].snippet.publishedAt,
                url: data.items[0].snippet.thumbnails.medium.url,
                views: data.items[0].statistics.viewCount,
                id: data.items[0].id,
                channelTitle: data.items[0].snippet.channelTitle,
                duration: data.items[0].contentDetails.duration,
                likes: data.items[0].statistics.likeCount,
                comments: data.items[0].statistics.commentCount,
                description: data.items[0].snippet.localized.description,
                channelId: data.items[0].snippet.channelId,
                title: data.items[0].snippet.localized.title,
              }}
            />
          </div>
        )}
        <div style={{ margin: "1rem auto" }}>
          <RelatedVideosCard wd={"149px"} ht={"60px"} id={data.items[0].id}  fun={toggle}/>
          {/* <RelatedVideosCard wd={"175px"} ht={"100px"} /> */}
          {/* <RelatedVideosCard wd={"175px"} ht={"100px"} /> */}
          {/* <RelatedVideosCard wd={"175px"} ht={"100px"} /> */}
          {/* <RelatedVideosCard wd={"175px"} ht={"100px"} /> */}
        </div>
      </div>
      {/* ))} */}
    </>
  );
}

export default FullVideo;
