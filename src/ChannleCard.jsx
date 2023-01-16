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
    <div className="card2" style={{ width: "80vw" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          className="card-image"
          style={{ background: "none", width: "150px" }}
        >
          <img
            src={data.items[0].snippet.thumbnails.medium.url}
            alt=""
            style={{ margin: "auto" , borderRadius:"100px"}}
          />
        </div>
        <div style={{display:"flex", flexDirection:"column" ,padding:"0 2vh"}}>
          <div className="heading" style={{ padding: "0 1vh" }} >
            {data.items[0].snippet.localized.title}
          </div>
          <div className="category" style={{ padding: "0 1vh" }}>
            {data.items[0].snippet.customUrl}
          </div>
          <Text
          color="blue.600"
          fontSize="xs"
          as="b"
          style={{
            display: "flex",
            textAlign: "center",
            width:"120px",
            padding:"6px",
            justifyContent:"space-between"
          }}
        >
          <Text  fontSize="xm" className="subscriber">
            {" "}
            Subscriber{" "}
          </Text>
          {convertToInternational(data.items[0].statistics.subscriberCount)}
        </Text>
        </div>
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
            <div className="heading">
        <div className="author">
          <span className="name">Created At : </span> {date}
          {/* By <span class="name">Abi</span> 4 days ago */}
        </div>
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
          {data.items[0].statistics.videoCount}
          <Text color="white" fontSize="xs">
            {" "}
            Videos{" "}
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
          {" "}
          {convertToInternational(data.items[0].statistics.viewCount)}
          <Text color="white" fontSize="xs">
            Channel Views{" "}
          </Text>
        </Text>
      </div>
      
    </div>
  );
}

export default ChannelCard;
