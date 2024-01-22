import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SearchBar.scss';
import { Close, Search } from "@mui/icons-material";
import Ads from "../../Ads/Ads";
import { Autocomplete, Stack, TextField, useMediaQuery } from "@mui/material";

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
    setNote(" ")
    
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
        //const newOptions = data.map((item) => item.title);
        setMyOptions(data);
        setNote(data.map((item) => item.title))
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };



  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className={`search-container ${expanded ? 'expanded' : ''}`}>
          
          {!expanded && <Ads />}
          {expanded && (
            <Stack spacing={2} sx={{ width: 300 }}>
          
            <Autocomplete
            style={{ width: 500 }}
            freeSolo
            autoComplete
            autoHighlight
            options={myOptions.map((option) =>option.title)}
            value={note}
            sx={{fontSize:"17px"}}
            renderInput={(params) => (
              <TextField {...params}
                onChange={getDataFromAPI}
                variant="outlined"
                label="Search Box"
                sx={{fontSize:"17px"}}
                value={note}

              />
            )}
                                
          />
          </Stack>
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
