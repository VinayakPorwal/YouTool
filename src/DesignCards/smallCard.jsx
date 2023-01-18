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

  // const data = props.data;

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
    <div>
      {/* <Heading
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
      </Heading> */}
      <Card direction={{ base: "column", sm: "row" }} variant="none" m={2}>
        <div
          className=""
          style={{ display: "flex" }}
          onMouseOver={() => {
            document.getElementById(`${"data.id"}hover`).style.display = "flex";
          }}
          onMouseOut={() => {
            document.getElementById(`${"data.id"}hover`).style.display = "none";
          }}
        >
          {/* -------------------Image Section ------------------ */}
          {
            // {!video && (
            <div>
              <img
                src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=1600&q=60"
                alt=""
                // onClick={() => {
                //   setVideo(true);
                // }}

                style={{
                  width: props.wd,
                  height: props.ht,
                  objectFit: "cover",
                }}
              />

              {/* ----------------------Duration Stamp -------------- */}
              <Text
                fontSize="xs"
                className="duration"
                style={{ width: props.wd }}
              >
                {" "}
                <p>{"2:3"}</p>
              </Text>
            </div>
          }

          <CardBody p="0">
            {/* <Heading size="md">The perfect latte</Heading>

<Text py="2">
Caffè latte is a coffee beverage of Italian origin made with
espresso and steamed milk.
</Text> */}
            <div
              style={{ display: "flex", width: props.wd, padding: "0 0px 0 0" }}
            >
              <div style={{ width: "95%" }}>
                {/* --------------------------------- Title --------------------------- */}
                <div
                  className="heading title"
                  title={"title"}
                  style={{ lineHeight: "1.2rem" }}
                >
                  {/* {"title"} */}
                  {
                    "Coder Ki Khoj | TVF Pitchers - Bonus Scenes ft. Arunabh Kumar, Abhay Mahajan, Gopal Datt"
                  }
                </div>
                {/* --------------------------------- Channel Title --------------------------- */}
                <div className="channelName" title={"data.channelTitle"}>
                  {"data.channelTitle"}
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
                {/* {convertToInternational(data.views)} {"views"} • {date} */}
                90k views . 2 days ago
              </div>
            </div>
          </CardBody>
        </div>
      </Card>
    </div>
  );
}

export default RelatedVideosCard;
