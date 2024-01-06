import React, { useState } from 'react';
import { Box, Divider } from '@mui/material';
import ImageData from '../../component/ImageData';
import './Checkout.scss'

const ShoppingCart = ({ cartItems, totalPrice }) => {
  const [isCartExpanded, setCartExpanded] = useState(false);

  const handleCartToggle = () => {
    setCartExpanded(!isCartExpanded);
  };

  return (
    <Box className={`carts ${isCartExpanded ? 'expanded' : ''}`}>
      <h2 style={{ color: 'teal' }}>My items</h2>
      <div className='my-cart'>
        {cartItems.map((item, index) => (
          <Box key={index} flex="1 1 30%" mt={"40px"} sx={{ display: "flex" }}>
            <div style={{ width: "20%", height: "20%", marginRight: "30px" }}>
            <ImageData item={item} />
            </div>
            <p className="itemTitle">{item.title}</p>
            <span className='itemPrice'>Price: {item.price}</span>
          </Box>
        ))}
      </div>

      <Box>
        <Divider />
        <h2>SUBTOTAL</h2>
        <span>{totalPrice.toFixed(2)}</span>
      </Box>

      <Box>
        <h2>TOTAL</h2>
        {totalPrice.toFixed(2)}
      </Box>

      <div className="cart-toggle" onClick={handleCartToggle}>
        Toggle Cart
      </div>
    </Box>
  );
};

export default ShoppingCart;
