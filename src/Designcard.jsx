import React from "react";
import { format } from "date-fns";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Box,
} from "@chakra-ui/react";
function ChannelCard(props) {
  const data = props.data;

  let date = data.items[0].snippet.publishedAt;
  date = new Date(date);
  date = date.toISOString().substring(0, 10);

  function convertToInternational(labelValue) {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e9
      ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(1) + "B"
      : // Six Zeroes for Millions
      Math.abs(Number(labelValue)) >= 1.0e6
      ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(1) + "M"
      : // Three Zeroes for Thousands
      Math.abs(Number(labelValue)) >= 1.0e3
      ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(1) + "K"
      : Math.abs(Number(labelValue));
  }
  return (
    <div className="card2">
      <div className="card-image" style={{ background: "none" }}>
        <img
          src={data.items[0].snippet.thumbnails.medium.url}
          alt=""
          style={{ margin: "auto" }}
        />
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
        </Text>
      </div>
      <div className="heading"> {data.items[0].snippet.localized.title}</div>
      <div className="category">
        {data.items[0].snippet.customUrl} 
      </div>
      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box
                as="span"
                flex="1"
                fontSize="sm"
                textAlign="left"
                color="black"
              >
               Description
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <div className="heading" style={{ fontSize: "small" }}>
              {" "}
              {data.items[0].snippet.localized.description}
            </div>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
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
          {convertToInternational(data.items[0].statistics.subscriberCount)}
          <Text color="black" fontSize="xm">
            {" "}
            Subscriber{" "}
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
          {data.items[0].statistics.videoCount}
          <Text color="black" fontSize="xs">
            {" "}
            Videos{" "}
          </Text>
        </Text>
      </div>
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
        {" "}
        {convertToInternational(data.items[0].statistics.viewCount)}
        <Text color="black" fontSize="xs">
          Channel Views{" "}
        </Text>
      </Text>
      <div className="heading">
        <div className="author">
          <span className="name">Created At : </span> {date}
          {/* By <span class="name">Abi</span> 4 days ago */}
        </div>
      </div>
    </div>
  );
}

export default ChannelCard;
