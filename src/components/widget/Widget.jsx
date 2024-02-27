import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import GroupsIcon from '@mui/icons-material/Groups';
import EventIcon from '@mui/icons-material/Event';
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useScrollTrigger } from "@mui/material";
import { fetchUserData } from "../../DataBase/User";
import { fetchActiveEventsData } from "../../DataBase/Event";
import { fetchActiveGroupsData } from "../../DataBase/Group";
const Widget = ({ type }) => {
  let data;
  const[count,setcount]=useState(0);
  
  switch (type) {
    case "user":
      const fetchUsers=async()=>{
          try{
            const users=await fetchUserData();
            setcount(users.length);
          }catch(error){
            console.log(error);
          }
      }
      fetchUsers();
      data = {
        title: "ACTIVE_USERS",
        link: "See all users",
        actualLink:'/users',
        count: count,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;




    case "events":

    const fetchEvents=async()=>{
      try{
        const users=await fetchActiveEventsData();
        setcount(users.length);
      }catch(error){
        console.log(error);
      }
  }
  fetchEvents();
      data = {
        title: "Events",
        isMoney: true,
        link: "View all events",
        count: count,
        actualLink:'/Event',
        icon: (
          <EventIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;



    case "groups":
      const fetchGroups=async()=>{
        try{
          const users=await fetchActiveGroupsData();
          setcount(users.length);
        }catch(error){
          console.log(error);
        }
    }
    fetchGroups();
      data = {
        title: "Groups",
        isMoney: true,
        link: "See details",
        actualLink:'/group',
        count: count,
        icon: (
          <GroupsIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.count}
        </span>
        <Link to={data.actualLink} style={{textDecoration:"none"}}><span className="link">{data.link}</span></Link>
      </div>
      <div className="right">
        <div className="percentage positive">
     
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
