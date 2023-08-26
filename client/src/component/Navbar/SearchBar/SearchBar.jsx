import React, { useEffect, useState } from "react";
import { TextField, Autocomplete, InputAdornment, Fab, Zoom } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import './SearchBar.scss';
import { Close, Search } from "@mui/icons-material";
import Ads from "../../Ads/Ads";

function SearchBar() {

  const banner = (
    <>
    <img style={{ width: "150px", height: "40px", transition: "2s linear all", marginRight: "20px" }} src="uploads/shoes/3940543.jpg" alt="" className="search-image"  />
    <h2>GET 50% DISCOUNT ON CLASSICS...</h2>

    </>
  )



    const[expanded, setExpanded] = useState(false);
    const navigate = useNavigate()
  
    function expandView(){
      
      setExpanded(true);
      setButtonVisible(true)
      
       
    }

    function closeView(e){
      setExpanded(false);
      setButtonVisible(false)       
    }

    function haandleSubmit(e){
      e.preventDefault()
      navigate(`/search/${note}`)
    }
  
    const [buttonVisible, setButtonVisible] = useState(true);

  
       const [note, setNote] = useState("")
      
    
    
       
  
    return (

        <>
        <div className="form" >
        <form  onSubmit={haandleSubmit}>


        <div
          className={`search-container ${expanded ? 'expanded' : ''}`}

        >
        
        {!expanded && <Ads />}
        
          {expanded &&
            <input

              className={` search ${expanded ? 'expanded' : ''}`}
              name="note"
              onChange={(e) => setNote(e.target.value)}
              value={note}
              placeholder="Search products..."
              rows={expanded ? 3 : 1}
              sx={{ fontSize: "30px" }}
              onFocus={() => setExpanded(true)}
              onBlur={() => setExpanded(false)} 
               />}
        </div>


      </form>
      <button className="btn">

          {expanded ? <Close onClick={closeView} sx={{fontSize:"40px"}}/> : <Search className="searchIcon" onClick={expandView} />}
          </button>
          </div> 
          </>



        
     
         
         


      
      

    );
}
export default SearchBar
