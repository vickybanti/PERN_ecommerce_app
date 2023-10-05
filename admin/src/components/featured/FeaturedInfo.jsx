import React, { useEffect, useState } from 'react'
import './featured.css'
import { MoreVert } from '@mui/icons-material'
import { CircularProgressbar } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';


function FeaturedInfo() {
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
  return (
    <div className='featuredInfo'>
        <div className="top">
            <h1>Total Revenue</h1>
            <MoreVert fontSize="small" />
        </div>
        <div className="bottom">
            <div className="featuredChart">
                <CircularProgressbar value={70} text={"70%"} strokeWidth={3}/>
            </div>
            <p className="progress-title">Total sales made this month</p>
            <p className='amount'>${orderByMonth.sum}</p>
            <p className="desc">Last payments may not be included</p>
            <div className="summary">
                <div className="item">
                    <div className='itemTitle'>Target</div>
                    <div className='itemResult positive'>
                    <ArrowUpwardIcon fontSize='small'/>

                        <div className='resultAmount'>$12.4k</div>
                        </div>
                </div>

                <div className="item">
                    <div className='itemTitle'>Target</div>
                    <div className='itemResult'>
                    <ArrowDownwardIcon fontSize='small'/>

                        <div className='resultAmount'>$12.4k</div>

                        </div>
                </div>

                <div className="item">
                    <div className='itemTitle'>Target</div>
                    <div className='itemResult negative'>
                    <ArrowDownwardIcon fontSize='small'/>

                        <div className='resultAmount'>$12.4k</div>

                        </div>
                </div>
            </div>
            </div>
    </div>
  )
}

export default FeaturedInfo
