import React from 'react'
import useFetchAProduct from '../../hooks/useFetchAProduct'
import Single from '../../components/single/Single'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import '../../components/single/single.css'
import Chart from '../../components/chart/Chart'
import WidgetLg from '../../components/widgetLg/WidgetLg'

function Product() {

    const {proData, imageData} = useFetchAProduct()


    console.log(proData[0], imageData)
  return (
        

    
            <div className='single'>
            
            <Sidebar />
      
            <div className='singleContainer'>
              <Topbar />

             
              <><div className='top'>
                      <div className='left'>
                      {proData.map((pro) => (
                          <><div className='editButton'>Edit</div><h1 className='itemInfo'>Information</h1><div className='useritem'>
                              
                                {imageData && imageData.map((image)=>(
                                   
                                    <img src={image} alt='' className='itemImg'/>
                                ))}
                            

                              <div className='details'>
                                  <h1 className='itemDetails'>{pro.title}</h1>
                                  <div className='detailItem'>
                                      <span className="itemKey">Description:</span>
                                      <span className="itemValue">{pro.desc}</span>
                                  </div>
                                  <div className='detailItem'>
                                      <span className="itemKey">Sizes:</span>
                                      <span className="itemValue">{pro.brand_title}</span>
                                  </div>


                                  <div className='detailItem'>
                                      <span className="itemKey">Price:</span>
                                      <span className="itemValue">{pro.price}</span>
                                  </div>

                                  <div className='detailItem'>
                                      <span className="itemKey">Sizes:</span>
                                      <span className="itemValue">{pro.sizes}</span>
                                  </div>
                                
                                  
                                  <div className='detailItem'>
                                      <span className="itemKey">Stock:</span>
                                      <span className="itemValue">{pro.stock}</span>
                                  </div>

                                  <div className='detailItem'>
                                      <span className="itemKey">Status:</span>
                                      <span className="itemValue">{pro.stock>0?"in stock":"out of stock"}</span>
                                  </div>
                              </div>

                          </div></>
                          ))}
                          
                      </div>
                      
                  </div>
                  
                  
                  <div className='userbottom'>

                          <WidgetLg title=<h1 className='itemTitle'>Last transactions</h1> />
                      </div>
                      </>
            </div>
            
            
          </div>
        
        
    
   
  )
}

export default Product
