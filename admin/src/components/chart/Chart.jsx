import { useEffect, useState } from "react";
import "./chart.css";
import {
  AreaChart,
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
  Area,
} from "recharts";

export default function Chart({aspect, title}) {

  const [orders, setOrders] = useState([])

  useEffect(() => {
    const getOrders = async()=>{

    
    try {
      const response = await fetch(`http://localhost:5000/order/`,{
        method: "GET"
      })
      const  allOrders = await response.json()

      setOrders(allOrders)
    } catch (err) {
      console.error(err.message)
    }
  }
  getOrders()
  }, [])

  

  const data = orders.map((order) => ({
    name: order.month,
    Total: order.total, 
    pv: order.total, 
  }));

  
  return (
    <div className=" chart">
    <h2 className="chartTitle">{title}</h2>
      <ResponsiveContainer width="100%" aspect={aspect}>
      <AreaChart width={900} height={1000} data={data}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <defs>
        
        <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
        </linearGradient>

        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
    </linearGradient>
      </defs>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" className="chatGrid"/>
      <Tooltip />
      <Area type="monotone" dataKey="Total" stroke="#8884d8" fillOpacity={1} fill="url(#Total" />
      <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
    </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
