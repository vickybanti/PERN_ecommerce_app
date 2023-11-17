import React, { useEffect, useState } from 'react'
import './OrderPage.scss'
import { useNavigate, useParams } from 'react-router-dom';
import { makeRequest } from '../../../makeRequest';


function OrderDetails() {

    const {userId} = useParams()
    const navigate = useNavigate()
    

  const [orders, setOrders] = useState([]);
  const customer_details = []
  console.log(customer_details)
  const address = []
  console.log(address)
  const cartitems = []
  console.log(cartitems)
  

  useEffect(() => {
    const getOrders = async()=>{

    
    try {
      const response = await makeRequest.get(`/order/${userId}`)
      const  allOrders = await response.data

      setOrders(allOrders)
    } catch (err) {
      console.error(err.message)
    }
  }
  getOrders()
  }, [userId])
  console.log(orders)
  return (
    <><div className='container'>
          {orders.map((cart) => (
              cartitems.push(cart.cartitems)
          ))}
          {orders.map((order) => (
              customer_details.push(order.customer_details)
          ))}
          {customer_details.map((details) => (
              address.push(details.address)
          ))}
          <h2>ORDERS</h2>
          
          {orders.map((value, index)=>(

          
            value.cartitems.map((item,index) => (
              <div className="order" key={item[index].id}>



                  <><h3>
            {item[index].id}
                  </h3><img src="img/uploads/ok.jpeg" alt='product' /><div className='details'>
                          <p>{item[index].title}</p>
                          <span>{item[index].desc}</span>
                          <span>{item[index].count}</span>
                          <h3>{item[index].price}</h3>

                        
                          
                      </div></>
              </div>

         ))
          ))
        }
        {orders.map((value,index)=>(
          <span className='status'>{value.payment_status}</span>
        ))}



      </div></>
  )
}

export default OrderDetails
