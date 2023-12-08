import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import './Products.scss';
import SearchBar from '../../component/Navbar/SearchBar/SearchBar'
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import List from '../../component/List/List'
import useCat from '../../hooks/useCat';
import { Link, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import useProCat from '../../hooks/useProCat';
import { Box, Fab, Fade, Tab, Tabs, Typography, useMediaQuery, useScrollTrigger } from '@mui/material';
import useFetchProducts from '../../hooks/useFetchProducts';
import { responsive } from '../../component/Responsive';
import { FilterList, ResetTv, Search, SelectAll } from '@mui/icons-material';
import { toast } from 'react-toastify';
import FilterListIcon from '@mui/icons-material/FilterList';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useTrending from '../../hooks/useTrending';



const Container = styled.div`

`

const FilterContainer = styled.div`
    display:flex;
    justify-content: space-between;

`
const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
`

const Title = styled.h1`
    margin: 20px;

`

const Filter = styled.div`
    margin:20px;

`



//scroll to top button
function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}



function Products() {

  
  const isNonMobile = useMediaQuery("(min-width:600px)");

  
  
  const [filters, setFilters] = useState("")
  const [value, setValue] = useState("")
  const [size, setSize] = useState("")




  //filters
  function handleSizes(event) {
    setSize(event.target.value)
    setFilters("")
  }
  function reset(event){
    event.preventDefault()
    setSize("")
    setFilters("")
  }

  
  // function handleType(event) {
  //   setType(event.target.value)
  // }
  
  
  const handleFilter = (event) => {
    setFilters(event.target.value);
    setSize("")
  };

  const handleChange = (e) => {
    e.preventDefault()
    setValue(prevValue => {
      return [...prevValue,value]
    })
  }

  //Search bar
  // const[expanded, setExpanded] = useState(false);
  
  //   function expandView(){
  //     setExpanded(true);
  //     setButtonVisible(false)
       
  //   }
  
  //   const [buttonVisible, setButtonVisible] = useState(true);

   
  //      const [note, setNote] = useState("")

  return (
   <> <div id="back-to-top-anchor"></div>
    <div>

      <FilterContainer className="filters" style={{ paddingTop: "150px", margin: " auto 100px", color:"white"}}>


     
        
        <Filter>
        <Box sx={{ minWidth: 120 }} style={{isNonMobile}}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
          <FilterListIcon sx={{fontSize:"20px", color:"cadetblue"}} />
          Filters
          
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filters}
            label="Filters"
            onChange={handleFilter}
            sx={{fontSize:"15px"}}

          >

                  <MenuItem value="maxPrice" sx={{fontSize:"15px"}}>Price (highest to lowest)</MenuItem>
                  <MenuItem value="minPrice" sx={{fontSize:"15px"}}>Price(lowest to highest)</MenuItem>
                  <MenuItem value="trending" sx={{fontSize:"15px"}}>trending</MenuItem>
                </Select>
              </FormControl>
            </Box>

            
        
        </Filter>

        <Filter>
        <h2>Reset Filters</h2>
        <ResetTv sx={{color:"black", fontSize:"30px",cursor:"pointer"}} onClick={(event)=>reset(event)}/>
    
        </Filter>
        <Filter>
        
      
        <Box sx={{ minWidth: 120 }} >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label"><FilterListIcon sx={{fontSize:"20px", color:"cadetblue"}} />Size</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={size}
              label="size"
              onChange={handleSizes}
              sx={{fontSize:"15px"}}
            >
            
              <MenuItem value="39" sx={{fontSize:"15px"}}>38</MenuItem>
              <MenuItem value="40" sx={{fontSize:"15px"}}>40</MenuItem>
              <MenuItem value="42" sx={{fontSize:"15px"}}>42</MenuItem>
              <MenuItem value="44" sx={{fontSize:"15px"}}>44</MenuItem>
              <MenuItem value="L" sx={{fontSize:"15px"}}>L</MenuItem>
              <MenuItem value="XL" sx={{fontSize:"15px"}}>XL</MenuItem>
              <MenuItem value="XXL" sx={{fontSize:"15px"}}>XXL</MenuItem>

            </Select>
          </FormControl>
        </Box>    
    </Filter>
    
        
       
      </FilterContainer>
          
      {<List  size={size} 
      filters={filters}
      
      />}

    </div>
    <ScrollTop>
        <Fab size="large" aria-label="scroll back to top">
          <KeyboardArrowUpIcon sx={{ fontSize: 40 }} />
        </Fab>
      </ScrollTop> </>
  )
}

export default Products
