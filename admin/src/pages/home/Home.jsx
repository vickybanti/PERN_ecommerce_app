import Chart from "../../components/chart/Chart";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import FeaturedInfo from "../../components/featured/FeaturedInfo";
import Widgets from "../../components/widgets/Widgets";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Home() { 


  
  return (
    <div className="home">
    <Sidebar />
    
    <div className="homeContainer">
    <Topbar />
    <div className="homewidgets">
      <Widgets type="user"/>
      <Widgets type="order"/>
      <Widgets type="balance"/>
      <Widgets type="earnings"/>
    </div>
    <div className="charts">
    <FeaturedInfo />

      <Chart title="Last 6 months (Revenue)" aspect={3/2} grid dataKey="Active User" className="recharts"/>
      </div> 
    <div className="homeWidgets">

        <WidgetLg title="Latest transaction"/>
      </div>
      </div>
    </div>
  );
}
