import React, { useEffect, useState } from 'react'
import './OrderPage.scss'
import { NavLink, useParams } from 'react-router-dom';
import { Button, ButtonBase, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { ExpandMore } from '@mui/icons-material';
import OrderSkeleton from '../../../component/skeleton/OrderSkeleton';
import OrderItems from '../../../component/skeleton/OrderItems';
import SkeletonProduct from '../../../component/skeleton/SkeletonProduct';
import SkeletonProductImg from '../../../component/skeleton/SkeletonProductImg';


function OrderPage() {

    const userId = useSelector((state) => state.auth.userID)

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false)
  const [showMenu, setMenu] = useState(false);


  


  
  const toggleMenu = (index) =>{
    setMenu(!showMenu)
  };

  const hideMenu = ()=>{
    setMenu(false)
  };





  useEffect(() => {
    const getOrders = async()=>{

    
    try {
      setLoading(true)
      const response = await fetch(`http://localhost:5000/order/${userId}`,{
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
  }, [userId])
  console.log(orders)
  return (
    <div className='order-container'>
    
    

        <h2>ORDERS</h2>
        {loading ?
          [...Array(12).keys()].map(i => {
            return <OrderSkeleton 
            key={i} />}) : orders.map((value,index)=>(
            
                    

        
        <><><div className="order" key={value.order_id}>


                        {loading?<OrderItems style={{float:"right"}}/> : value.cart.map((item) => (

              


              <div className="order-id">

                <div className='allOrders'>
                <div className='order-image'>
                  <img src={item.imageData} alt='product' />
                </div>

                <div className='details'>


                  <h3 className='order-title'>{item.title}</h3>
                  <span className='order-count'>{item.count}</span>
                  <p className='order-price'>{item.price}</p>

                  <div style={{display:"flex", justifyContent:"space-between"}}><span style={{
                    backgroundColor: value.payment_status === "paid" ? "green" : "gray",
                    width:"30%", padding:"5px", textAlign:"center"
                  }}>{value.payment_status}</span> <p style={{color:"black",paddingRight:"10px"}}>{value.payment_intent}</p></div>

                 
                  <NavLink onClick={()=>toggleMenu(index)} className="orderbtn" key={value.order_id===index}>See shipping details</NavLink>

                  
                  <div className='address' key={index.order_id}>
                  <div className={showMenu ? 'show-nav' : 'hide-nav'}>
                    
                    <h3>Shipping details</h3>
                    <span className='shipping'>
                      <p>{value.street1}</p>
                      <p>{value.street2}</p>
                      <p>{value.city}</p>
                      <p>{value.state}</p>
                      <p>{value.country}</p>
                      <p className='status' style={{ backgroundColor: value.delivery_status === "delivered" ? "green" : "gray", textAlign: "center", padding: "3px", width: "30%" }}> {value.delivery_status}</p>

                    </span>
                    <Button onClick={hideMenu}>hide</Button>

                  </div>

                </div>


                  </div>


                  
                </div>
                
              
              </div>))}


          </div><Divider /></></>
        ))}
              
              
               
              

      )
        
    </div>
  )
}

export default OrderPage
