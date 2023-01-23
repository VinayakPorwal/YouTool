import React, { useEffect } from "react";
import DesignCard2 from "../DesignCards/DesignCard2";
import RelatedVideosCard from "../DesignCards/RelatedInfoCard";

function FullVideo(props) {
  var data = props.array[0];
  data = data.items[0]
  var toggle = props.fun

  useEffect(()=>{
    var watchData = JSON.parse(localStorage.getItem("WatchHistory"));
    if (watchData) {
      var newArr = watchData.filter((watchData) => {
        return watchData.id !== data.id;
      });
      if (watchData.length !== newArr.length) {
        console.log("Already Exists");
        return;
      } else {
        watchData.unshift({
          id: data.id,
        });
        if (watchData.length > 10) {
          watchData = watchData.slice(0, 10);
        }
        localStorage.setItem(
          "WatchHistory",
          JSON.stringify(watchData)
        );
      }
    } else {
      watchData = [];
      watchData.unshift({
        id: data.id,
      });
      localStorage.setItem("WatchHistory", JSON.stringify(watchData));
      console.log("Key not found");
    }
  },[])
  return (
    <>
      {" "}
      {/* {props.array.map((data, i) => ( */}
      <div style={{ display: "flex", flexWrap: "wrap", overflow:"hidden" }}>
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
              wd={"57vw"} //49
              ht={"32vw"} //28
              info={{
                date: data.snippet.publishedAt,
                url: data.snippet.thumbnails.medium.url,
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
        <div style={{ margin: "1rem auto" , padding:"0 0rem "}}>
        {data && (
          <RelatedVideosCard wd={"149px"} ht={"60px"} id={data.id}  fun={toggle}/>)}
        
        </div>
      </div>
      {/* ))} */}
    </>
  );
}

export default FullVideo;
