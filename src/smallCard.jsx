import React,{useEffect, useState} from "react";
import { format } from "date-fns";
import { Text } from "@chakra-ui/react";
function RecentCard(props) {
  //   let duration = data.items[0].contentDetails.duration.slice(2, 8);
  //   duration = duration.replace(/\D/g, ":");
  //   duration = duration.slice(0, -1);



  const [deta, setDeta] = useState()
    async function Detailed(id) {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${id}&key=${props.api_key}`
        );
        const data = await response.json();
    
        console.log("Video", data.pageInfo.totalResults);
        // props.set;
        return data;
      }

     useEffect( ()=>{
       async function go() {

           setDeta(await Detailed(props.id));
           console.log(deta)
        }
        go();
     },[]) 
 

  const data = props.data;
  let date = data.snippet.publishedAt;
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

  return (
    <div className="card2 smallCard" style={{ width: "200px" }}>
      <div className="card-image">
        <img src={data. snippet.thumbnails.medium.url} alt="" />
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
          {/* {duration} */}
        </Text>
      </div>
      <div className="category">
        {" "}
        {/* {convertToInternational(data.items[0].statistics.viewCount)} Views{" "} */}
      </div>
      <div className="heading"> {data.snippet.title}</div>
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
          {/* {data. statistics.likeCount} */}
          <Text color="black" fontSize="xm">
            {" "}
            {/* Likes{" "} */}
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
          {/* {data. statistics.commentCount} */}
          <Text color="black" fontSize="xs">
            {" "}
            {/* Comments{" "} */}
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
  );
}

export default RecentCard;
