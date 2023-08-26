import React from 'react'
import { useSelector } from 'react-redux'
import ItemCard from '../../component/Card/ItemCard'

function SavedItems() {

    const savedProducts = useSelector((state)=>state.savedProducts)
    console.log(savedProducts.savedItems)
  return (
    <div className='saved'>
      {savedProducts.savedItems.map((item)=>(
        // <ItemCard item={item} key={item?.id} imageData={item?.imageData}/>
        <img src={item.imageData} alt='' height="150px" width="150px"/>
        
      ))}
    </div>
  )
}

export default SavedItems
