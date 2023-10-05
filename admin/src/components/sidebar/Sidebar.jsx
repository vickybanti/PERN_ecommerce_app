import "./sidebar.css";


import LineStyleIcon from '@mui/icons-material/LineStyle';
import TimelineIcon from '@mui/icons-material/Timeline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import StorefrontIcon from '@mui/icons-material/Storefront';
import BarChartIcon from '@mui/icons-material/BarChart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ReportIcon from '@mui/icons-material/Report';

import { Link, NavLink } from "react-router-dom";
import { DialogActions } from "@mui/material";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";

export default function Sidebar() {

  const {dispatch} = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
      <span className="logo">Moore store</span>
    </div>
        <div className="center">
          <h3 className="sidebarTitle">
          <DialogActions className="sidebarIcon" />
           Dashboard</h3>
          <ul className="sidebarList">
            <NavLink to="/" className="link" activeClassName="active">
            <li className="sidebarListItem">
              <LineStyleIcon className="sidebarIcon" />
              Home
            </li>
            </NavLink>
            <li className="sidebarListItem ">
              <TimelineIcon className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <TrendingUpIcon className="sidebarIcon" />
              Sales
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <NavLink to="/users" className="link" activeClassName="active">
              <li className="sidebarListItem">
                <PermIdentityIcon className="sidebarIcon" />
                Users
              </li>
            </NavLink>
            <NavLink to="/products" className="link" activeClassName="active">
              <li className="sidebarListItem">
                <StorefrontIcon className="sidebarIcon" />
                Products
              </li>
            </NavLink>
            <li className="sidebarListItem">
              <AttachMoneyIcon className="sidebarIcon" />
              Transactions
            </li>
            
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutlineIcon className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeedIcon className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutlineIcon className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        
          
        <div className="sideBottom">
          <div className="gray" onClick={()=>dispatch({type:"LIGHT"})}></div>
          <div className="dark" onClick={()=>dispatch({type:"DARK"})}></div>
        </div>
      </div>

  );
} 
