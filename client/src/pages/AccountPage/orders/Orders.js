import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { addToCart, decreaseCount, increaseCount, deleteProduct, removeFromCart } from '../../../redux/slice/cartSlice';
import { SET_ACTIVE_USER, selectIsLoggedIn } from '../../../redux/slice/authSlice';
import StripeCheckout from 'react-stripe-checkout';
import { ShoppingCart, ShoppingCartCheckout } from '@mui/icons-material';
import Payment from '../../../component/Pay/Payment';
import { deleteCart } from '../../../redux/apiCalls';


function Orders() {

  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState("")
  useEffect(()=>{
    async function getId() {
      try{
        const response = await fetch("http://localhost:5000/dashboard/user_id",{
          method: "GET",
          headers :{ token: localStorage.token, persist:"root"}
        });
  
        const parseRes = await response.json();
        

        setUserId(parseRes.user_id)
       

        // ...
      
        // User is signed out
        
      
  
      } catch(err) {
        console.error(err.message)
      }
    }
  
    getId()
  }, [userId]);

  useEffect(() => {
    const getOrders = async()=>{

    
    try {
      const response = await fetch(`http://localhost:5000/order/`,{
        method: "GET"
      })
      const  allOrders = await response.json()

      setOrders(allOrders)
    } catch (err) {
      console.error(err.message)
    }
  }
  getOrders()
  }, [])
  


const KEY = process.env.REACT_APP_STRIPE


const Container = styled.div`
    margin: auto;
    padding: 30px;

`
const Title = styled.h1`
    align-items: center;
    justify-content: center;
`

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${(props) => props.type==='filled' && 'none'};
    background-color: ${(props)=> props.type === 'filled' ? 'black': 'transparent'};

    color: ${(props) => props.type === 'filled' && 'white'};
`
const Toptexts = styled.div`

`
const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;
`
const Info = styled.div`
    flex:3
`
const Bottom= styled.div`
    display: flex;
    justify-content: space-between;
`

const Product = styled.div`
    display: flex;
    justify-content: space-between;
`

const ProductDetail = styled.div`
    display:flex;
    flex:2;

`
const Details = styled.p`
    padding: 20px;
    display: flex;
    flex-direction:column;
    justify-content: space-around;

` 
const ProductSize = styled.div`
`
const Image = styled.img`
    width: 50%;


`
const ProductId = styled.div``
const ProductName = styled.span``
const ProductColor = styled.div`

    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props=>props.color}
`
const PriceDetail = styled.div`
    flex:1;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content: center;
`
const ProductAmountContainer = styled.div`
    margin-bottom: 3px;
    display:flex;
    align-items:center;

    
`
const ProductAmount = styled.div`
    font-size: 20px;
    
    margin: 5px;

`
const ProductPrice = styled.div`
    font-weight: 200;
    font-size: 30px;
    
`
const Hr = styled.hr`
    background-color: teal;
    border: none;
`
const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;

    
`
const SummaryTitle = styled.h1``
const SummaryItem = styled.span`
    margin: 30px 0px;
    display:flex;
    justify-content: space-between;
    font-weight: ${props=>props.type ==="total" && "500"};
    font-size: ${props=>props.type ==="total" && "24px"};


`
const SummaryItemText = styled.div``
const SummaryItemPrice = styled.div``
const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: teal;
    font-weight: 600;


`



    const user = useSelector(selectIsLoggedIn)
    const cart = useSelector((state) => state.cart)
    const navigate = useNavigate()
    const [cartUser, setCartUser] = useState(null)



console.log(cartUser)
    const {id} = useParams()
    const dispatch = useDispatch()
  const totalPrice = useSelector((state) => state.cart.totalPrice).toFixed(2)
  const deleteProduct = async (item) => {
    dispatch(removeFromCart(item));
  };
  
  return (
    <Container>
    
    <wrapper>
      <Title>BAG</Title>
      <Top>
      <TopButton>
        <Button onClick={()=>navigate("/products")}>
        CONTINUE SHOPPING
        <ShoppingCart />
        </Button>
        </TopButton>
        


        <Toptexts>
            <TopText>ShoppingBag (2)</TopText>
            
            <TopText>Your wishlist</TopText>
        </Toptexts>
        <TopButton>
        <Button>
        <ShoppingCartCheckout />
        CHECKOUT NOW</Button>
        </TopButton>
      </Top>
      <Bottom>
        <Info>
        {cart.cartItems.map((item, index) => (                    
           <> index={item.id}

            <Product>

                <ProductDetail>

                    <Image src="https://c8.alamy.com/comp/PET4DD/samut-sakhon-thailand-august-13-2018-product-shoot-of-nike-mens-sport-running-shoe-on-white-backgroundnike-running-shoes-PET4DD.jpg" />
                    <Details>
                        <ProductName><b>Product: </b>{item.title}</ProductName>
                        <ProductId><b>ID:</b> {item.id}</ProductId>
                        <ProductColor color="black" />
                        <ProductSize><b>Desc:</b>{item.desc}</ProductSize>
                    </Details>
                </ProductDetail>
                <PriceDetail>
                    <ProductAmountContainer>
                        <AddIcon onClick={()=>increaseCount(item.count)}/>
                        <ProductAmount>{item.count}</ProductAmount>
                        <RemoveIcon onClick={()=>decreaseCount(item.count)}/>
                    </ProductAmountContainer>
                    <ProductPrice>${item.price * item.count}</ProductPrice>
                </PriceDetail>
                <button onClick={()=>deleteProduct(item)}>Delete</button>
            </Product><Hr></Hr></>
            )
)}
        
        </Info>
        <Summary>
        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
        <SummaryItem>
            <SummaryItemText>Subtotal</SummaryItemText>
            <SummaryItemPrice>$ {totalPrice}</SummaryItemPrice>
        </SummaryItem>

        <SummaryItem>
            <SummaryItemText>Estimated shipping</SummaryItemText>
            <SummaryItemPrice>$ </SummaryItemPrice>
        </SummaryItem>

        <SummaryItem>
            <SummaryItemText>Total</SummaryItemText>
            <SummaryItemPrice>$ {totalPrice}</SummaryItemPrice>
        </SummaryItem>
           <Payment cartItems={cart.cartItems}/> 
           
        
        </Summary>
      </Bottom>

    </wrapper>
    </Container>
  )
}
        

export default Orders
