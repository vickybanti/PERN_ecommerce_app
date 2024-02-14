import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Close, Search, SearchOffRounded } from "@mui/icons-material";
import Ads from "../../Ads/Ads";
import { Autocomplete, Input, Stack, TextField, useMediaQuery } from "@mui/material";
import './SearchBar.scss'


function SearchBar() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const [note, setNote] = useState("");
  const isMatch = useMediaQuery('600px');
  const [myOptions, setMyOptions] = useState([]);

  
  const handleInputChange = (event, value) => {
    setNote(event.target.value);
  };

  const handleSubmit = (e,value) => {
    e.preventDefault();
    setNote(value);
    navigate(`Products/search/${note}`);
    setExpanded(false);
  };

  const expandView = () => {
    setExpanded(true);
  };

  const closeView = () => {
    setExpanded(false);
  };

    const textFieldStyle = {
      fontSize: '16px !important',
    };
  
  
  

  return (
    <div className="form">
      <form onSubmit={handleSubmit}

      >

      <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      style={{color:"gray"}}
      viewBox="0 0 24 24"
    >
      <path
        d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14C7.02 14 5 11.98 5 9.5S7.02 5 9.5 5 14 7.02 14 9.5 11.98 14 9.5 14z"
      />
    </svg>
      
                  <Input
                    variant="outlined"
                    placeholder="Search items here..."
                    style={textFieldStyle}
                    value={note}
                    onChange={handleInputChange}
                    sx={{fontSize:"15px"}}
                    className="input"
                    />

                
              
        
      </form>
      
    </div>
  );
}

export default SearchBar;
