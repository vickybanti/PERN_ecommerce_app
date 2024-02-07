import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Close, Search } from "@mui/icons-material";
import Ads from "../../Ads/Ads";
import { Autocomplete, Input, Stack, TextField, useMediaQuery } from "@mui/material";


function SearchBar() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const [note, setNote] = useState("");
  const isMatch = useMediaQuery('600px');
  const [myOptions, setMyOptions] = useState([]);

  const debounce = (func, delay) => {
    let timer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  };

  const getDataFromAPI = debounce(() => {
    fetch(`https://mooreserver.onrender.com/search/?title=${note}`)
      .then((response) => response.json())
      .then((data) => {
        const newOptions = data.map((item) => item.title);
        setMyOptions(newOptions);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, 100); // Adjust the delay as needed

  const handleInputChange = (event, value) => {
    setNote(value);
    getDataFromAPI();

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
      <form onSubmit={handleSubmit}>

          
          
              <Autocomplete
                style={{ width: 450 }}
                autoComplete
                autoHighlight
                options={myOptions}
                font={25}

                value={note}
                onChange={handleInputChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Search items here..."
                    style={textFieldStyle}
                    />
                )}
              />
                

              
        
      </form>
      
    </div>
  );
}

export default SearchBar;
