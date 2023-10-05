import { useEffect, useState } from "react";
import "./widgetLg.css";
import { GridDeleteIcon } from "@mui/x-data-grid";
import List from "../list/List";
import {useDispatch,useSelector} from "react-redux"
import { Delete } from "@mui/icons-material";
import Datatable from "../datatable/Datatable";
import {Link} from "react-router-dom"
import { changeStatusToDelivered, changeStatusToPending } from "../../redux/apiCalls";

export default function WidgetLg({title}) {
  
  const [orders, setOrders] = useState([])
  const dispatch = useDispatch()
  
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const getOrders = async()=>{

    
    try {
      setLoading(true)
      const response = await fetch(`http://localhost:5000/order/`,{
        method: "GET"
      })
      const  allOrders = await response.json()

      setOrders(allOrders)
      setLoading(false)
    } catch (err) {
      console.error(err.message)
      setLoading(false)
    }
  }
  getOrders()
  }, [])

  
  console.log(orders)


  const changeStatusToDelivered = async(id)=> {
    const change = await fetch(`http://localhost:5000/order/status/${id}`,{
      method:"PUT",
      body:JSON.stringify({id:id}),
      headers:{"Content-Type" : "application/json"}
    }
    )
    const changeOrder =  await change.json()

    if(changeOrder){
      window.location.reload();

      console.log("Status has been changed...")
    }

  }

 const changeStatusToPending = async(id)=> {
    const change = await fetch(`http://localhost:5000/order/status/pending/${id}`,{
      method:"PUT",
      body:JSON.stringify({id:id}),
      headers:{"Content-Type" : "application/json"}
    }
    )
    const changeOrder =  await change.json()

    if(changeOrder){
      window.location.reload();
      console.log("Status has been changed...")
    }

  }


  



  

  
  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "order_id", headerName: "ORDER ID", width: 150 },

    {
      field: "user",
      headerName: "User",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {params.row.customer}
          </div>
        );
      },
    },
    { field: "phoneNumber", headerName: "Phone number", width: 200 },
    {
      field: "amount",
      headerName: "Amount",
      width: 150,
      

      
    },
    {
      field: "status",
      headerName: "Status",
      width: 90,
      

      
    },
    
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
          <div>
           
            
            {params.row.status === "delivered" ?

            <button onClick={()=>changeStatusToPending(params.row.id)}>Set to pending</button>
            :
            <button onClick={()=>changeStatusToDelivered(params.row.id)}>Set to delivered</button>


        }
        <Link to={`/order/${params.row.id}`} style={{backgroundColor:"teal",
        padding:"10px",
        width:"50px",
        color:"white",
      textDecoration:"none",
    marginLeft:"5px"}}>View</Link>
            </div>
          </>
        );
      },
    },
  ];

  const orderRows = orders.map((order) => {return {
    id:order.id,
    order_id:order.order_id,
    customer:order.firstname,
    phoneNumber:order.phone_number,
    date:order.date,
    status:order.delivery_status,
    amount:`${order.total}`,    
    

    
  }})
  return (
    <div>
    <Datatable rows={orderRows} columns={columns} />

</div>
  );
}