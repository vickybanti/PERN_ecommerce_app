import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Close, Search, SearchOffRounded } from "@mui/icons-material";
import Ads from "../../Ads/Ads";
import { Autocomplete, IconButton, Input, InputAdornment, InputBase, Stack, TextField, useMediaQuery } from "@mui/material";
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
      <IconButton style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}>
            <i className="fas fa-search"></i>
          </IconButton>
      
      
                  <Input
                    variant="outlined"
                    placeholder="Search items here..."
                    style={textFieldStyle}
                    value={note}
                    onChange={handleInputChange}
                    sx={{fontSize:"15px"}}
                    className="input"
                    startAdornment={
                      <InputAdornment position="start">
                        <Search sx={{fontSize:"25px"}} />
                      </InputAdornment>
                    }

                    
                    />

                
              
        
      </form>
      
    </div>
  );
}

export default SearchBar;
