import React, { useState } from "react";
import { Input } from "@chakra-ui/react";
import { Button, Image, CardBody, Card, Text, Heading } from "@chakra-ui/react";
import "./App.css";
import DesignCard2 from "./DesignCard2";

function Component(props) {
  const [array, setArray] = useState([]);
  const [check, setCheck] = useState(false);

  const [input, setInput] = useState("");
  const count = 8;
  var mainData = [];
  const api_key = "AIzaSyC6iuW5Oz08bv_e8pGIRTkyERDlTH5mWAc";

  const loading = document.getElementById("loading");
  async function keySearch() {
    setArray([]);
    loading.style.display = "block";
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?q=${input}&maxResults=${count}&key=${api_key}`
    );
    let data = await response.json();
    mainData = [];
    data = data.items;
    data.map(async (load, i) => {
      await Detailed(load.id.videoId);
        console.log(mainData.length, mainData);
      if (mainData.length === data.length) {
        setCheck(true);
        setArray(mainData);
        loading.style.display = "none";
      }
      // console.log(i, load.id.videoId);
    });
  }
  async function Detailed(id) {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${id}&key=${api_key}`
    );
    const data = await response.json();
    mainData.push(data);

    // console.log("main", data.pageInfo.totalResults);
    // props.set;
    return data;
  }

  return (
    <>
      <Heading size="lg" style={{ textAlign: "center" }}>
        Search Your Youtube Video
      </Heading>
      <div
        style={{
          display: "flex",
          padding: "2vh",
          maxWidth: "1200px",
          margin: "auto",
          position: "sticky",
          top:"0px",
          background: "#6b46c1",
          borderRadius:"10px",
          // background: "#3f79e6",
          zIndex:"2"
        }}
      >
        <Input
          placeholder="Basic usage"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button colorScheme="blue" onClick={keySearch}>
          Button
        </Button>
      </div>
      <Card
        id="loading"
        maxW="lg"
        borderRadius="lg"
        style={{ background: "white", margin: "2vh", display: "none" }}
      >
        <CardBody>
          <span className="loader"></span>
        </CardBody>
      </Card>
      <div
        style={{
          margin: "auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          maxWidth: "1100px",
        }}
      >
        {check ? (
          array.map((data, i) => (
            <>
              {data.pageInfo.totalResults === 1 ? (
                // <Card maxW="md" style={{ background: "white", margin: "2vh" }} key={i}>
                //   <CardBody>
                //     <Image
                //       style={{ width: "100%" }}
                //       src={data.items[0].snippet.thumbnails.standard.url}
                //       alt="Green double couch with wooden legs"
                //       borderRadius="lg"
                //     />
                //     <Text
                //       style={{
                //         position: "relative",
                //         bottom: "35px",
                //         left: "25px",
                //         background: "white",
                //         padding: "2px 4px",
                //         display: "inline-block",
                //         fontWeight: "700",
                //         borderRadius: "5px",
                //       }}
                //     >
                //       {data.items[0].contentDetails.duration.slice(2, 8)}
                //     </Text>
                //     <Stack mt="6" spacing="3">
                //       <Heading size="md">
                //         {data.items[0].snippet.localized.title}
                //       </Heading>

                //       <div
                //         style={{
                //           display: "flex",
                //           justifyContent: "space-evenly",
                //         }}
                //       >
                //         <Text color="blue.600" fontSize="m">
                //           {data.items[0].statistics.viewCount}Views
                //         </Text>
                //         <Text color="blue.600" fontSize="m">
                //           {data.items[0].statistics.likeCount} Likes
                //         </Text>
                //         <Text color="blue.600" fontSize="m">
                //           {data.items[0].statistics.commentCount} Comments
                //         </Text>
                //       </div>
                //     </Stack>
                //   </CardBody>
                // </Card>
                <div key={i} className="mainCardDiv">
                  <DesignCard2 data={data} />
                </div>
              ) : (
                <div style={{ display: "none" }}> </div>
              )}
            </>
          ))
        ) : (
          <div>error</div>
        )}

      </div>
        <div>
          <Text fontSize="xl" style={{ textAlign: "center", padding: "2vh" }}>
            More Features Coming Soon.. Site is Under Development
          </Text>
        </div>
    </>
  );
}

export default Component;
