import React from "react";
import "./topbar.css";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PublicIcon from '@mui/icons-material/Public';
import { Search } from "@mui/icons-material";
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import { Divider } from "@mui/material";
import { logout } from "../../redux/apiCalls";
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router"
import { useState } from "react";
export default function Topbar() {


  const [message, setMessage] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  async function handleLogout(e) {

    e.preventDefault();
    
    logout(dispatch);
    setMessage("Logging user out")
    navigate("/")

  }
  
  return (
    <><div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <div className="search">
            <input className="search-input" type="text" placeholder="search" />
            <Search />
          </div>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNoneIcon />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <PublicIcon />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <SettingsApplicationsIcon />
          </div>
          <div className="topbarIconContainer">
            <button onClick={handleLogout}>{message?message:"logout"}</button>
          </div>
          <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
        </div>

      </div>

    </div><Divider /></>

  );
}
