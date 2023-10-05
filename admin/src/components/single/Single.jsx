import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import Topbar from '../topbar/Topbar'
import './single.css'
import Chart from '../chart/Chart'
import List from '../list/List'
import WidgetLg from '../widgetLg/WidgetLg'

function Single({name, image,detail, price, stock, status,desc}) {
  return (
    <div className='single'>
      <Sidebar />

      <div className='singleContainer'>
        <Topbar />
        <div className='top'>
            <div className='left'>
            <div className='editButton'>Edit</div>
                <h1 className='itemInfo'>Information</h1>
                <div className='useritem'>
                    <img src={image}
                    alt=''
                    className='itemImg' />

                <div className='details'>
                    <h1 className='itemDetails'>{name}</h1>
                    <div className='detailItem'>
                        <span className="itemKey">{desc}:</span>
                        <span className="itemValue">{detail}</span>
                    </div>

                    <div className='detailItem'>
                        <span className="itemKey">Phone:</span>
                        <span className="itemValue">{price}</span>
                    </div>

                    <div className='detailItem'>
                        <span className="itemKey">Address:</span>
                        <span className="itemValue">{stock}</span>
                    </div>

                    <div className='detailItem'>
                        <span className="itemKey">Country:</span>
                        <span className="itemValue">{status}</span>
                    </div>
                </div>
                    
                </div>
                </div>
        <div className='right'>
            <Chart aspect={3/1} title="User Spending (Last 6 months"/>
        </div>
        </div>
        <div className='userbottom'>
            
            <WidgetLg title=<h1 className='itemTitle'>Last transactions</h1>/>
        </div>
      </div>
    </div>
  )
}

export default Single
