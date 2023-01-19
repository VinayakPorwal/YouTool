import React, { useState } from "react";
import { format } from "date-fns";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  Avatar,
} from "@chakra-ui/react";
function RelatedVideosCard(props) {
  const [deta, setDeta] = useState();
  const [related, setRelated] = useState();

  // const data = props.data;

  function second_to_minute(i) {
    var sec = i % 60;
    var min = 0;
    var hr = 0;

    min = Math.floor(i / 60);
    if (min > 59) {
      hr = Math.floor(min / 60);
      min = min % 60;
    }
    if (sec<10) sec="0"+sec;
    if (min<10) min="0"+min;
    // if (sec<10) sec="0"+sec;
    if (hr===0)return min + ":" + sec;
    else return hr + ":" + min + ":" + sec;
  }
  async function RelatedVideos(id) {
    const response = await fetch(
      `https://server-ten-iota.vercel.app/relatedInfo/?url=https://www.youtube.com/watch?v=${id}`,
      {
        // mode: "no-cors",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      }
    );
    const data = await response.json();
    setRelated(data.data);
    console.log(data.data);
  }
  useState(() => {
    RelatedVideos(props.id);
  }, []);
  return (
    <div>
      <Heading
        size="md"
        m="3"
        style={{
          alignItems: "center",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <p>Related Videos</p>
      </Heading>
      {related &&
        related.map((data, i) => (
          <Card
            direction={{ base: "column", sm: "row" }}
            variant="none"
            m={2}
            key={data.id}
          >
            <div
              className=""
              style={{ display: "flex" }}
              // onMouseOver={() => {
              //   document.getElementById(`${"data.id"}hover`).style.display =
              //     "flex";
              // }}
              // onMouseOut={() => {
              //   document.getElementById(`${"data.id"}hover`).style.display =
              //     "none";
              // }}
            >
              {/* -------------------Image Section ------------------ */}
              {
                // {!video && (
                <div>
                  <img
                    // src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=1600&q=60"
                    src={data.thumbnails[1].url}
                    alt=""
                    // onClick={() => {
                    //   setVideo(true);
                    // }}

                    style={{
                      minWidth: props.wd,
                      width: props.wd,
                      minHeight: props.ht,
                      objectFit: "cover",
                    }}
                  />

                  {/* ----------------------Duration Stamp -------------- */}
                  <Text
                    fontSize="xs"
                    className="duration"
                    style={{ width: props.wd }}
                  >
                    <span> {second_to_minute(data.length_seconds)}</span>
                  </Text>
                </div>
              }

              <CardBody p="0">
                <div
                  style={{
                    display: "flex",
                    width: props.wd,
                    padding: "0 0px 0 0",
                  }}
                >
                  <div style={{ width: "95%" }}>
                    {/* --------------------------------- Title --------------------------- */}
                    <div
                      className="heading title"
                      title={data.title}
                      style={{ lineHeight: "1.2rem" }}
                    >
                      {data.title}
                    </div>
                    {/* --------------------------------- Channel Title --------------------------- */}
                    <div className="channelName" title= {data.author.name}>
                      {data.author.name}
                    </div>
                  </div>
                  <div style={{ width: "5%", textAlign: "end" }}>
                    <i
                      className="fa fa-chevron-up detailsButton"
                      title="More Details"
                      style={{ margin: "0" }}
                      // id={`${data.id}button`}
                    ></i>
                  </div>
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
                    {data.short_view_count_text}
                    {"views"} • {data.published}
                  </div>
                </div>
              </CardBody>
            </div>
          </Card>
        ))}
    </div>
  );
}

export default RelatedVideosCard;
