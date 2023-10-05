import { Alert, Button, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import "./account.scss";
import "./saved.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { Delete } from "@mui/icons-material";
import { deleteItem } from "../../redux/slice/savedItemSlice";


const NoSavedItem = () => {
  return (
    <div
      className="d-flex justify-content-center pt-5"
      style={{ textAlign: "center" }}
    >
      <div className="col-md-7">
        <div
          style={{
            background: "rgba(30, 40, 50, 0.5)",
            padding: "10em",
            height: "8em",
            width: "8em",
            borderRadius: "50%",
            margin: "auto",
          }}
        >
          <FolderSpecialIcon
            sx={{
              fontSize: "6em",
              color: "skyblue",
            }}
          />
        </div>
        <p className="card-title">
          You currently have no saved items.
        </p>
        
        <h3 className="savedlink">
        <NavLink
          to={"/"}
          
         
        >
          CONTINUE SHOPPING
        </NavLink>
        </h3>
      </div>
    </div>
  );
};

function SavedItems() {
  const navigate = useNavigate();
  const dispatch = useDispatch()


  const savedProducts = useSelector((state)=>state.savedProducts)
    console.log(savedProducts.savedItems)
  return (
    <div className='saved'>

      {savedProducts.savedItems.length ===0 ?NoSavedItem(): 
        savedProducts.savedItems.map((item)=>(
        // <ItemCard item={item} key={item?.id} imageData={item?.imageData}/>
        
        <div className="savedProduct">
            <div className="card-container">
            <NavLink to={`/product/${item.id}`}><span className="span">View product</span></NavLink>
            <Delete sx={{fontSize:"30px", cursor:"pointer"}}  onClick={()=>dispatch(deleteItem(item))}/>
            </div>
           <img onClick={()=>navigate(`/product/${item.id}`)} className="savedImage" src={item.imageData} alt='' height="150px" width="150px" />
        </div>
        

        
            
        
      ))}
    </div>
  )
}

export default SavedItems;
