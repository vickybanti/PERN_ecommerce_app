import React, { useEffect, useState } from 'react'
import {useParams} from "react-router"

import './Order.css'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'


function Order() {

  const orderId = useParams().id
  console.log(orderId)
    const [orders, setOrder] = useState([])

    useEffect(() => {
        const getOrders = async()=>{
    
        
        try {
          const response = await fetch(`http://localhost:5000/order/order/${orderId}`,{
            method: "GET",
            headers:{"Content-Type":"application/json"}          
          })
          const allOrders = await response.json()
          console.log("all orders = ", allOrders)
    
          setOrder(allOrders)
        } catch (err) {
          console.error(err.message)
        }
      }
      getOrders()
      }, [orderId])

      console.log(orders)
  return (
    <div className='single'>
      <Sidebar />

      <div className='singleContainer'>
        <Topbar />
        <div className='top'>
            <div className='left'>
            <h1 style={{fontSize:"15px", paddingBottom:"10px"}}>Products ordered</h1>
            {orders && orders.map((order) => (
              order.cart.map((cart) => (

              

            
                <><h1 className='itemInfo'>{cart.id}</h1><div className='useritem'>
                <img src={cart.imageData}
                  alt=''
                  className='itemImg' />

                <div className='details'>
                  <h1 className='itemDetails'>{cart.title}</h1>
                  <div className='detailItem'>
                    <span className="itemKey">description:</span>
                    <span className="itemValue">{cart.desc}</span>
                  </div>

                  <div className='detailItem'>
                    <span className="itemKey">Price:</span>
                    <span className="itemValue">{cart.price}</span>
                  </div>

                  <div className='detailItem'>
                    <span className="itemKey">Stock:</span>
                    <span className="itemValue">{cart.stock}</span>
                  </div>
                  

                  <div className='detailItem'>
                    <span className="itemKey">Delivery Status:</span>
                    <span className="itemValue">{order.delivery_status}</span>
                  </div>
                </div>

              </div></>
              ))
                ))}
                </div>
        
        </div>
        
      </div>
    </div>
  )
}

export default Order
