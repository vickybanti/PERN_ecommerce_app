import './App.css';
import React from "react";
import {
 
  Route,
  Routes,
 
  Navigate,
} from "react-router-dom";

import Navbar from './component/Navbar/Navbar';
import Footer from './component/Footer/Footer';
import Homepage from './pages/Home/Homepage';
import Product from './pages/Product/Product';
import "./App.scss";
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Cart from './pages/Cart/Cart';
import Featuredroducts from './component/FeaturedProducts/Featuredroducts';
import TrendingProducts from './component/FeaturedProducts/TrendingProduct';
import List from './component/List/List';
import { useSelector } from 'react-redux';
import NoMatch from './component/NoMatch';
import CheckoutSuccess from './component/Pay/CheckoutSuccess';
import CartItem from './component/Navbar/CartItem';
import OrderPage from './pages/AccountPage/orders/OrderPage';
import { ToastContainer } from 'react-toastify';
import Products from "./pages/Products/Products"
import Checkout from './pages/checkout/Checkout'
import Payment from './component/Pay/Payment';
import ImageUploader from './pages/ImageUploader';
import UserAccount from './pages/AccountPage/UserAccount';
import SavedItems from './pages/AccountPage/SavedItems';
import OrderDetails from './pages/AccountPage/orders/OrderDetails';
import Voucher from './pages/AccountPage/Voucher';
import AccountSummary from './pages/AccountPage/AccountSummary';
import AddressBook from './pages/AccountPage/AddressBook/AddressBook';
import NewAddress from './pages/AccountPage/AddressBook/NewAddress';
import DefaultAddress from './pages/AccountPage/AddressBook/DefaultAddress';
import DeleteAccount from './pages/AccountPage/ManageAccount/DeleteAccount';
import ResetPassword from './pages/auth/Reset/ResetPassword';

// const Products = React.lazy(()=> import('./pages/Products/Products'))


function App() {


const user = useSelector((state)=> state.auth.isLoggedIn)
  return (
    <>
    <ToastContainer 
    position="bottom-left"
    theme="dark"
    autoClose="2000"
    closeOnClick
    
    />
    <Navbar />
    <CartItem />   

    <Routes>
      <Route path='/' element={<Homepage />}></Route>
      
      <Route path='products' element={ <Products />}>
        <Route index element={<List />} />
        <Route path='featured' element={<Featuredroducts />} />
        <Route path='trending' element={<TrendingProducts />} />
      </Route>

       <Route
          path="profile"
          element={user ? <UserAccount /> : <Navigate to="/login" />}
        >

          <Route path="summary" element={<AccountSummary />} />
          <Route path="orders" element={<OrderPage />} />
          <Route path="orderDetails" element={<OrderDetails />} />
          <Route path="vouchers" element={<Voucher />} />
          <Route path='saved' element={<SavedItems />} /> 
          <Route path="address" element={<AddressBook />} />
          <Route path="new-address" element={<NewAddress />} />
          <Route path="default-address" element={<DefaultAddress />} />
          <Route path="close" element={<DeleteAccount />} />

          
          
        </Route>


      <Route path='categories/:title' element={<List />} />
      <Route path='brands/:brand' element={<List />} />
      <Route path='search/:note' element={<List />} />

      <Route path='product/:id' element={<Product />} />

      <Route path="login" element={user ? <Navigate to="/" /> : <Login />} />


      <Route path="register" element={<Register/> } />
      <Route path="checkout" element={user? <Checkout /> : <Login />} />
      <Route path="payment" element={<Payment />} />
      <Route path='reset' element={<ResetPassword />} />
      <Route path='cart' element={<Cart /> } />
      <Route path='success' element={user? <CheckoutSuccess /> :<NoMatch /> } />
      <Route path='*' element={<NoMatch /> } />


 {      // <Route path='order' element={user? <Orders /> : <Login />} />
}      <Route path='order/:userId' element={user ? <OrderPage /> : <Login />} />
      <Route path='upload' element={<ImageUploader /> } />

    </Routes>

    <Footer/ > 
</>
    
    
    
  );
}

export default App;

