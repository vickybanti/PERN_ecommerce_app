import React,{useState, useEffect} from 'react';
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NewUser from "./pages/newUser/NewUser";
import Product, {productColumns, productRows} from './pages/product/Product'

import List from "./components/list/List";
import Single from "./components/single/Single";
import {productInputs, userColumns, userInputs, userRows } from "./dummyData";
import './components/style/dark.scss'
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import useFetchProducts from "./hooks/useFetchProducts";
import ProductList from "./pages/productList/ProductList";
import Edit from "./pages/edit/Edit";
import UserList from "./pages/userList/UserList";
import Login from "./pages/auth/Login";
import {useSelector} from 'react-redux'
import Order from './pages/order/Order';


function App() {

  const user = useSelector((state)=>state.auth.userID)
  console.log(user)
 

  const {darkMode} = useContext(DarkModeContext)
  return (
    <div className={darkMode?"app dark" : "app"}>
    <Router>
    
      <Routes>
         
        <Route path="/"> 
          <Route index element={user ? <Home />: <Login />} />
        <Route path="users" >
          <Route index element={<UserList />} title="Add New User"/>
          
          </Route> 
 
          <Route path="products">
            <Route index element={<ProductList />} />
            <Route path="new" element={<NewUser inputs={productInputs} title="Add New Product"/>} />
            <Route path="edit/:id" element={<Edit inputs={productInputs} title="Edit Product"/>} />
          <Route path=":id" element={<Product />} />

          </Route>

          <Route path='order/:id' element={<Order />}></Route>



          </Route>

      </Routes>
    </Router>

    </div>
  );
}

export default App;
