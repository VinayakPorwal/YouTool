import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import img from "../logopng.png";
import {
  Divider,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

function Sidebar(props) {
  const navigate = useNavigate();
  return (
    <>
      {" "}
      <i
        className="fa fa-bars"
       
        id="navbarButton"
        onClick={() => {
          if (document.getElementById("sidenavbar").style.display === "none") {
            document.getElementById("sidenavbar").style.display = "block";
            props.setLogo(false)
          } else {
            document.getElementById("sidenavbar").style.display = "none";
            props.setLogo(true)
          }
        }}
      ></i>
      <div className="sideBar" id="sidenavbar">
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginBottom: "2vh",
            alignItems: "center",
          }}
        >
          <i
            className="fa fa-bars"
            style={{
              display: "flex",
              width: "30%",
              justifyContent: "center",
              alignItems: "center",
              opacity:"0"
            }}
            
          ></i>

          <div className="logo">
            <div className="youtube">
              <img src={img} alt="" />
            </div>

            <p>YouTool</p>
          </div>
        </div>

        {/* ---------------------------- filter --------------------------- */}
        <Divider />
        <Menu>
          <MenuButton
            style={{ display: "flex", margin: "1rem auto", color: "white" }}
            onClick={() => {
              var button = document.getElementById(`tabselect`);
              if (button.style.transform === "rotate(0deg)") {
                button.style.transform = "rotate(180deg)";
              } else {
                button.style.transform = "rotate(0deg)";
              }
            }}
          >
            <i
              className="fa fa-chevron-down"
              style={{
                fontSize: "xx-small",
                margin: "0 5px",
                transform: "rotate(0deg)",
              }}
              title="Filter"
              id="tabselect"
            ></i>
            <i
              className="fa fa-filter"
              style={{ fontSize: "smaller", margin: "0 10px 0 0" }}
            ></i>
            {props.tab}{" "}
          </MenuButton>
          <div style={{ zIndex: "2" }}>
            <MenuList
              style={{
                background: "var(--secondaryBlack)",
                zIndex: "77",
                position: "absolute",
                color: "white",
              }}
            >
              <MenuItem
                className="Tab"
                onClick={() => {
                  props.setToggle(1);
                  props.setTab("Search by : Keyword");
                  // setInput("");
                  props.setPlaceHolder("BB ki Vines");
                }}
              >
                Keyword
              </MenuItem>
              <MenuItem
                className="Tab"
                onClick={() => {
                  props.setToggle(2);
                  props.setTab("Search by : Channel");
                  // setInput("");
                  props.setPlaceHolder("https://www.youtube.com/channel/");
                }}
              >
                Channel Link
              </MenuItem>
              <MenuItem
                className="Tab"
                onClick={() => {
                  props.setToggle(3);
                  // setInput("");
                  props.setTab("Search by : Video");
                  props.setPlaceHolder("https://www.youtube.com/watch?v=");
                }}
              >
                Video Link
              </MenuItem>
            </MenuList>
          </div>
        </Menu>
        <Divider />
        <div>
          <div
            className="sideTab"
            onClick={() => {
              props.home();
              props.setTab("Filter");
              navigate("/");
            }}
          >
            <i className="fa fa-home sideTab-i"></i>
            <p className="sideTab-p">Home</p>
          </div>
          <div
            className="sideTab"
            onClick={() => {
              props.trending();
              props.setTab("Trending");
              navigate("/trending");
            }}
          >
            <i className="fa fa-fire sideTab-i"></i>
            <p className="sideTab-p">Trending</p>
          </div>
          <div className="sideTab">
            <i
              className="fa fa-history sideTab-i"
              style={{ color: "grey" }}
            ></i>
            <p className="sideTab-p" style={{ color: "grey" }}>
              History
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
