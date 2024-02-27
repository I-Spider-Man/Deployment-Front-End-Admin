import React, { useContext, useState, useRef } from "react";
import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
// import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
// import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
// import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUserAction } from "../../Auth/auth.action";
import { message } from "antd";
const Navbar = () => {
  const dispatch1=useDispatch();
  const { dispatch } = useContext(DarkModeContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef();
  const handleLogout=()=>{
    dispatch1(logoutUserAction());
    message.success("user logout success.");
  }
  const handleAvatarClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div>
          
        </div>
        <div className="items">
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          
          <div className="item" onClick={handleAvatarClick} ref={dropdownRef}>
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
            {dropdownVisible && (
              <div className="dropdown">
                 <Link to="/dashboard" style={{ textDecoration: "none" }}>
                <div className="dropdownItem">Dashboard</div>
                </Link>
                <Link to="/Profile/${params.row.userId}" style={{ textDecoration: "none" }}>
                <div className="dropdownItem">Profile</div>
                </Link>
                <Link to="/" style={{ textDecoration: "none" }}>
                <div className="dropdownItem" onClick={()=>handleLogout()}>Logout</div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
