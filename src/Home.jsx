import React, { useEffect, useState } from "react";
import {
  Heading,
  Button,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Checkbox,
  Card,
  CardBody,
} from "@chakra-ui/react";
import DesignCard2 from "./DesignCards/DesignCard2";
import img from "./logopng.png";

function Home(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [save, setSave] = useState();
  const [array, setArray] = useState([]);
  const [loading, setLoading] = useState(false);

  const [checkboxes, setCheckboxes] = useState([
    { id: 1, label: "Sports", checked: false },
    { id: 2, label: "News", checked: false },
    { id: 3, label: "Business", checked: false },
    { id: 4, label: "Music", checked: false },
    { id: 5, label: "Crypto", checked: false },
    { id: 6, label: "Comedy", checked: false },
    { id: 7, label: "Movies", checked: false },
  ]);

  const handleCheckboxChange = (id) => {
    const updatedCheckboxes = checkboxes.map((checkbox) => {
      if (checkbox.id === id) {
        return { ...checkbox, checked: !checkbox.checked };
      }
      return checkbox;
    });
    setCheckboxes(updatedCheckboxes);
  };

  const CustomFeed = () => {
    let tem2 = [];
    setLoading(true);

    checkboxes.map(async (checkbox) => {
      if (checkbox.checked) {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?q=${
            checkbox.label
          }&maxResults=${5}&key=${props.api_key}`
          // `https://server-ten-iota.vercel.app/download/?url=https://www.youtube.com/watch?v=Tr8AS-a4AOc`
        );
        let data = await response.json();
        if (data.pageInfo.totalResults === 0) {
          alert("Results Not Found");
          return;
        }

        let temp = tem2;
        // async function mm() {
        //   data.items.map(async (item) => {
        //     temp.push(await get(item.id.videoId));
        //     console.log("in map", temp);
        //   });

        //   return temp;
        // }
        //  mm().then((res) => {
        //   tem2 = res;
        //   console.log("second last", res, tem2);
        // });

        async function mm() {
          const promises = data.items.map(async (item) => {
            const result = await get(item.id.videoId);
            temp.push(result);
            return result;
          });

          await Promise.all(promises);
          // temp = temp.concat(temp22);
          // console.log("in mm", temp);

          return temp;
        }

        mm().then((res) => {
          // console.log("second last", res);
          tem2 = res;
          setArray(res);
          setLoading(false);
        });
      }
    });
  };

  async function get(id) {
    const response = await fetch(
      `https://server-ten-iota.vercel.app/download/?url=https://www.youtube.com/watch?v=${id}`,
      {
        // mode: "no-cors",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      }
    );
    const info = await response.json();
    // console.log(info.data)
    return info.data;
    // setDownloads(temp);
  }

  function second_to_minute(i) {
    var sec = i % 60;
    var min = 0;
    var hr = 0;

    min = Math.floor(i / 60);
    if (min > 59) {
      hr = Math.floor(min / 60);
      min = min % 60;
    }
    if (sec < 10) sec = "0" + sec;
    if (min < 10) min = "0" + min;
    // if (sec<10) sec="0"+sec;
    if (hr === 0) return min + ":" + sec;
    else return hr + ":" + min + ":" + sec;
  }

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

  function DateIntoDuration(date1) {
    var date = new Date(date1);
    var date2 = new Date();

    var time_difference = date2.getTime() - date.getTime();

    //calculate days difference by dividing total milliseconds in a day
    var days_difference = time_difference / (1000 * 60 * 60 * 24);
    days_difference = Math.floor(days_difference);

    if (days_difference > 365) {
      if (Math.floor(days_difference / 365) === 1) {
        date = Math.floor(days_difference / 365) + " year ago";
      } else {
        date = Math.floor(days_difference / 365) + " years ago";
      }
    } else if (days_difference > 30) {
      if (Math.floor(days_difference / 30) === 1) {
        date = Math.floor(days_difference / 30) + " month ago";
      } else {
        date = Math.floor(days_difference / 30) + " months ago";
      }
    } else if (days_difference > 7) {
      if (Math.floor(days_difference / 7) === 1) {
        date = Math.floor(days_difference / 7) + " week ago";
      } else {
        date = Math.floor(days_difference / 7) + " weeks ago";
      }
    } else {
      if (days_difference === 0) date = "Today";
      else if (days_difference === 1) {
        date = days_difference + " day ago";
      } else {
        date = days_difference + " days ago";
      }
    }
    return date;
  }
  useEffect(() => {
    // CustomFeed();
  }, [save]);
  return (
    <>
      {/* <div>
        <img src={img} alt="" style={{ height: "100px", margin: "2vh auto" }} />
        <Text size="sm" color="blue.500" textAlign={"center"}>
          Go to Trending Page!
        </Text>
        <Heading
          size="lg"
          m="8"
          style={{
            textAlign: "center",
            width: "100%",
          }}
        >
          This Page is Under Devlopment.Stay Tuned!
        </Heading>
      </div> */}
      <div>
        {array && JSON.stringify(array.length)} {save}
      </div>
      <Button colorScheme="blue" onClick={onOpen}>
        Custom
      </Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          style={{ background: "var(--secondaryBlack)", color: "white" }}
        >
          <ModalHeader>Customize Your Feed s{save}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {checkboxes.map((checkbox) => (
              <div key={checkbox.id}>
                <Checkbox
                  m={2}
                  isChecked={checkbox.checked}
                  onChange={(e) => {
                    e.preventDefault();
                    handleCheckboxChange(checkbox.id);
                  }}
                >
                  {checkbox.label}
                </Checkbox>
              </div>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                setArray(CustomFeed());
                // console.log(CustomFeed());
                onClose();
              }}
            >
              Save
            </Button>
            <Button bgColor="gray.500" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {loading && (
        <div
          className="loadingHamster"
          id="loadingHome"
          style={{
            display: "flex",
            justifyContent: "center",
            zIndex: "1",
            position: "relative",
          }}
        >
          <div
            aria-label="Orange and tan hamster running in a metal wheel"
            role="img"
            className="wheel-and-hamster"
          >
            <div className="wheel"></div>
            <div className="hamster">
              <div className="hamster__body">
                <div className="hamster__head">
                  <div className="hamster__ear"></div>
                  <div className="hamster__eye"></div>
                  <div className="hamster__nose"></div>
                </div>
                <div className="hamster__limb hamster__limb--fr"></div>
                <div className="hamster__limb hamster__limb--fl"></div>
                <div className="hamster__limb hamster__limb--br"></div>
                <div className="hamster__limb hamster__limb--bl"></div>
                <div className="hamster__tail"></div>
              </div>
            </div>
            <div className="spoke"></div>
          </div>
        </div>
      )}
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
        Your
        <span
          style={{
            fontSize: "xxx-large",
            display: "flex",
            alignItems: "center",
            color: "#3f79e6",
            padding: "5px",
          }}
        >
          Customized
        </span>
        Feed
      </Heading>
      {/* {array && array.map((data, i) => (
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
      ))} */}
      {array &&
        array.map((data, i) => (
          <Card
            direction={{ base: "column", sm: "row" }}
            variant="none"
            my={4}
            px={1}
            key={i}
            maxW={"870px"}
          >
            <div
              className=""
              style={{ display: "flex", width: "-webkit-fill-available" }}
            >
              {/* -------------------Image Section ------------------ */}
              {
                // {!video && (
                <div>
                  <img
                    src={data.thumbnails[2].url}
                    alt=""
                    onClick={() => {}}
                    style={{
                      //   minWidth: props.wd,
                      width: "150px",
                      //   minHeight: props.ht,
                      objectFit: "cover",
                    }}
                  />

                  {/* ----------------------Duration Stamp -------------- */}
                  <Text
                    fontSize="xs"
                    className="duration"
                    style={{
                      width: props.wd,
                      justifyContent: "start",
                      margin: "-4vh 0px 0px 100px",
                      maxWidth: "120px",
                    }}
                  >
                    <span>{second_to_minute(data.lengthSeconds)}</span>
                  </Text>
                </div>
              }

              <CardBody p="0">
                <div
                  style={{
                    display: "flex",
                    maxWidth: "800px",
                    padding: "0 0px 0 0",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "600px",
                      width: "-webkit-fill-available",
                    }}
                  >
                    {/* --------------------------------- Title --------------------------- */}
                    <div
                      className="heading title"
                      title={data.title}
                      style={{ lineHeight: "1.2rem" }}
                    >
                      {data.title}
                    </div>
                    {/* --------------------------------- Channel Title --------------------------- */}
                    <div className="channelName" title={data.author.name}>
                      {/* anKAN */}
                      {data.author.name}
                    </div>
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
                      className="fa fa-solid fa-eye"
                      style={{ margin: "0 4px 0 0", color: "inherit" }}
                    ></i>
                    {convertToInternational(data.viewCount)} •{" "}
                    {DateIntoDuration(data.publishDate)}
                  </div>
                </div>
              </CardBody>
            </div>
          </Card>
        ))}
    </>
  );
}

export default Home;
