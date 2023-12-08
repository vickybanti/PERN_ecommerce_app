import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SearchBar.scss';
import { Close, Search } from "@mui/icons-material";
import Ads from "../../Ads/Ads";

function SearchBar() {

  



    const[expanded, setExpanded] = useState(false);
    const navigate = useNavigate()
  
    function expandView(){
      
      setExpanded(true);
      setButtonVisible(true)
      
       
    }

    function closeView(e){
      setExpanded(false);
      setButtonVisible(false)  
      setNote(" ")     
    }

    function handleSubmit(e){
      e.preventDefault()
      navigate(`/search/${note}`)
      closeView()
      setNote("")
    }
  
    const [buttonVisible, setButtonVisible] = useState(true);

  
       const [note, setNote] = useState("")
      
    
    
       
  
    return (

        <>
        <div className="form" >
        <form  onSubmit={handleSubmit}>


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
