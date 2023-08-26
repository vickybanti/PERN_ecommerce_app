import React from 'react'
import Navbar from '../components/Navbar'
import Announce from '../components/Announce'
import styled from 'styled-components'
import Products from '../components/Products'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import SearchBar from '../../component/Navbar/SearchBar/SearchBar'
import List from '../../component/List/List'


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

const Select = styled.select`
    padding:10px;
    margin-right: 20px;
    border:none;

`
const Option = styled.option`

`

function ProductList() {
  return (
    <div>
      <Navbar />
      <Announce />
      <FilterContainer>
        <Title>Dresses</Title>
        <Filter><FilterText>Filter Products:</FilterText>
        
            <Select>
                <Option disabled selected>Color</Option>
                <Option>White</Option>
                <Option>Black</Option>
                <Option>Red</Option>
                <Option>Blue</Option>
                <Option>Yellow</Option>
                <Option>Green</Option>

            </Select>
        
            <Select>
                <Option disabled selected>Size</Option>
                <Option>Xs</Option>
                <Option>S</Option>
                <Option>M</Option>
                <Option>L</Option>
                <Option>XL</Option>
                <Option>XXL</Option>

            </Select>
        </Filter>

        <Filter><FilterText>Sort Products: </FilterText>
        
            <Select>
                <Option disabled selected>New Arrivals</Option>
                <Option>Oldest</Option>
                <Option>Price</Option>
                <Option>Discount</Option>
                

            </Select>
        </Filter>
<Filter>
    <SearchBar />
</Filter>
      </FilterContainer>

      <List 
      />
        </div>
  )
}

export default ProductList
