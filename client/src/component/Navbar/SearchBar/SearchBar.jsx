import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SearchBar.scss';
import { Close, Search } from "@mui/icons-material";
import Ads from "../../Ads/Ads";
import { Autocomplete, TextField, useMediaQuery } from "@mui/material";

function SearchBar() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  function expandView() {
    setExpanded(true);
  }

  function closeView() {
    setExpanded(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    

     
      
    
    navigate(`Products/search/${note}`);
    closeView();
    setNote("");
  }

  const [note, setNote] = useState("");
  const isMatch = useMediaQuery('600px');
  const [myOptions, setMyOptions] = useState([])

  const getDataFromAPI = () => {
    console.log("Options Fetched from API");
    fetch(`https://mooreserver.onrender.com/search/?title=${note}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const newOptions = data.map((item) => item.title);
        setMyOptions(newOptions);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };



  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className={`search-container ${expanded ? 'expanded' : ''}`}>
          {isMatch && (
            <input
              className={`search ${expanded ? 'expanded' : ''}`}
              name="note"
              onChange={(e) => setNote(e.target.value)}
              value={note}
              placeholder="Search products..."
              sx={{ fontSize: "15px" }}
              onFocus={expandView}
              onBlur={closeView}
            />
          )}
          {!expanded && <Ads />}
          {expanded && (
            <Autocomplete
            style={{ width: 500 }}
            freeSolo
            autoComplete
            autoHighlight
            options={myOptions.map((option) => option.title)}
            renderInput={(params) => (
              <TextField {...params}
                onChange={getDataFromAPI}
                variant="outlined"
                label="Search Box"
              />
            )}
            
          />
          )}
        </div>
      </form>
      <button className="btn">
        {expanded ? (
          <Close onClick={closeView} className="close" />
        ) : (
          <Search className="searchIcon" onClick={expandView} />
        )}
      </button>
    </div>
  );
}

export default SearchBar;
