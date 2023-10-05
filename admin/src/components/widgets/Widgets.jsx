import { MonetizationOnOutlined, PersonOutline, PersonOutlineOutlined, ShoppingBag, ShoppingBagOutlined } from "@mui/icons-material";
import "./widget.css";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useEffect, useState } from "react";
import useFetchUsers from "../../hooks/useFetchUsers";
import useFetchOrders from "../../hooks/useFetchOrders";
export default function Widgets({type}) {

  const [users, setUsers] = useState("")
  const [allOrders, setOrders] = useState([])
  const [earnings, setEarnings] = useState([])


  const {data} = useFetchUsers()
  const {orderData} = useFetchOrders()

  console.log(orderData)

  const [orderByMonth, setOrderByMonth] = useState([])
    
    console.log(orderByMonth)

    useEffect(() => {
        const getOrder = async() => {
            try {
                const orders = await fetch(`http://localhost:5000/order/total/month`,{
                    method:"GET",
                });
                const allOrders = await orders.json()
                setOrderByMonth(allOrders)
            } catch (err) {
                console.error(err.message)
            }
        }
        getOrder()

    },[])


  useEffect(()=>{

    
    setUsers(data)
    setOrders(orderData)
    const sumOfEarnings = 0
    allOrders.map((order) => (
      sumOfEarnings + order.total
    ))
    setEarnings(sumOfEarnings)
    
  },[orderData,data,allOrders])

  console.log(earnings)
  let datas;

  
  const diff = 20
    switch(type){
      case "user":
        datas={
          title:"USERS",
          isMoney:false,
          link:"See all orders",
          amount:users.length,
          icon:<PersonOutlineOutlined className="icon" style={{
            color:"crimson", backgroundColor:"rgba(255,0,0,0.2)"
          }}/>,
        };
        break;
       
        case "order":
        datas={
          title:"ORDERS",
          isMoney:false,
          link:"view net earnings",
          amount:allOrders.length,
          icon:<ShoppingBag className="icon" style={{
            color:"black", backgroundColor:"gray"
          }}/>,
        };
        break;

        case "balance":
        datas={
          title:"BALANCE",
          isMoney:true,
          link:"See details",
          icon:<MonetizationOnOutlined className="icon" style={{
            backgroundColor:"rgba(128, 0, 128,0.2)", color:"green"
          }}/>,
        };
        break;

        case "earnings":
        datas={
          title:"EARNINGS",
          isMoney:true,
          link:"See details",
          amount:orderByMonth.sum,
          icon:<MonetizationOnOutlined className="icon" style={{
            backgroundColor:"black", color:"green"
          }}/>,
        };
        break;

        default:
          break;
    }

   

   return (
    <div className="featured">
        <div className="featuredItem">
          <div className="left">
          <span className="featuredTitle">{datas.title}</span>
          <span className="counter">{datas.isMoney  && "$"} {datas.amount && datas.amount} </span>
          <span className="link">{datas.link}</span>
          </div>

          <div className="right">
            <div className="percentage">
              <ArrowUpwardIcon /> {diff}%
            </div>
            {datas.icon}
          </div>
        </div>
        </div>
        


   );
}
