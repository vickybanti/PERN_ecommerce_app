import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Box, Button, Stepper, Step, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, Divider, TextField, Typography, ListItem, ListItemAvatar, Badge, Avatar, ListItemText } from "@mui/material";
import {Formik} from "formik";
import * as yup from "yup"
import Shipping from "./Shipping"

import { NavLink, useNavigate } from 'react-router-dom';

import Details from './Details';
import { LocalShipping, Payment, ContactPage, Check } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { clearCart } from '../../redux/slice/cartSlice';
import "./Checkout.scss"
import { makeRequest } from '../../makeRequest';
import ImageData from '../../component/ImageData';
import { loadStripe } from "@stripe/stripe-js";









const initialValues = {
    billingAddress: {
        firstName:"",
        lastName:"",
        country:"",
        street1:"",
        street2:"",
        state:"",
        city:"",
    },

    shippingAddress: {
        isSameAddress:true,
        firstName:"",
        lastName:"",
        country:"",
        street1:"",
        street2:"",
        state:"",
        city:"",
    },
    email:"",
    phoneNumber:"",

}

const checkoutSchema = [
    yup.object().shape({
      billingAddress: yup.object().shape({
        firstName: yup.string().required("required"),
        lastName: yup.string().required("required"),
        country: yup.string().required("required"),
        city: yup.string().required("required"),
        street1: yup.string().required("required"),
        street2: yup.string(),
        state: yup.string().required("required"),
      }),
  
      shippingAddress: yup.object().shape({
        isSameAddress: yup.boolean(),
        firstName: yup.string(),
        lastName: yup.string(),
        country: yup.string(),
        city: yup.string(),
        street1: yup.string(),
        street2: yup.string(),
        state: yup.string(),
      }),
    }),
  
    yup.object().shape({
      email: yup.string().required("required"),
      phoneNumber: yup.string().required("required"),
      


    }),
  ];
  
  

function Checkout(props) {
  const totalPrice = useSelector((state)=>state.cart.totalPrice)
  const cartItems = useSelector((state)=>state.cart.cartItems)
  const counts = cartItems.map((cart) => cart.count)
  console.log(counts)
    const navigate = useNavigate()
    const [activeStep, setActiveStep] = useState(0);
    const isFirstStep = activeStep===0;
    const isSecondStep = activeStep===1;
    const isThirdStep = activeStep===2;
    const [requestBody, setRequestBody] = useState([])
    const [formValues, setFormValues] = useState("")
    const userId = useSelector((state) => state.auth.userID)

    const [loading, setLoading] = useState(false)

  console.log('userid=',userId)
  console.log("total=",totalPrice)

  const dispatch = useDispatch()

    function handleFormChange(e){
      setFormValues(e.target.value)
      console.log("Formvalues=", e.target.value)
    }
  
    console.log(formValues)


    

    

      const [coupon, setCoupon] = useState("")
      function handleCoupon(e){
        e.preventDefault()
        setCoupon(e.target.value)
      }

      const generateTransactionCode = () => {
        const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let code = "";
        for (let i = 0; i < 6; i++) {
          code += characters[Math.floor(Math.random() * (characters.length - 1))];
        }
      
        return code;
      }

     
    
      
    const [clientSecret, setClientSecret] = useState("");

      
    async function makePayment(values) {
        const stripe = loadStripe("pk_test_51NDulnFA3ATF2zMuXsGjxz0JMzcX6Hj0QEQRBDx2RenNEnv3yz2R0WxB9cmSBhwrYzSMHago4LCa6nYPrSUkwBMu00Nx7VrwrY")
        console.log(stripe)
        console.log(cartItems)

        const cartTitle = cartItems.map((cart) => cart.title)
        const cartPrice = cartItems.map((cart) => cart.price)
        const total = cartItems.map((cart) => cart.total)



    
const newRequestBody = {
  userId,
    email: values.email,
    cartTitle,
    cartPrice,
    total,
    
        count:counts,
  totalPrice:totalPrice,
  phoneNumber:values.phoneNumber,
  country:values.billingAddress.country,
  city:values.billingAddress.city,
  state:values.billingAddress.state,
  street1:values.billingAddress.street1,
  street2:values.billingAddress.street2,
  firstName:values.billingAddress.firstName,
  lastName :  values.billingAddress.lastName
}
  console.log(requestBody)
        setRequestBody(newRequestBody)

        // Create PaymentIntent as soon as the page loads
   const response = await fetch("https://mooreserver.onrender.com/checkout/create_payment_intent", {
            methods: "POST",
       headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin":'*'},
       body: JSON.stringify(newRequestBody)
        })

           console.log(response.json())

        const session = await response.json()
        const result = stripe.redirecToCheckout({
            sessionId:session.id
        })

        console.log(result)

    


  
    
  
    
     


}
async function payOnDelivery(values){
  const requestBody = {
    userId,
    email:values.email,
    cartItems: JSON.stringify(cartItems),
    totalPrice:totalPrice,
    phoneNumber:values.phoneNumber,
    country:values.billingAddress.country,
    city:values.billingAddress.city,
    state:values.billingAddress.state,
    street1:values.billingAddress.street1,
    street2:values.billingAddress.street2,
    firstName:values.billingAddress.firstName,
    lastName :  values.billingAddress.lastName
  }
    console.log(requestBody)
  
  try {
    

    setLoading(true)
    const pay = await makeRequest.post("/checkout/payOnDelivery", JSON.stringify(requestBody), {
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers if needed
      },
    });
    const confirm = await pay.data
    console.log(confirm)

    if(confirm) {
      setLoading(false)
      dispatch(clearCart())
      console.log("Successful order")
      navigate("/success")
    } else {
      console.log("Unsuccessful")
    }
  } catch (err) {
    setLoading(false)
    console.error(err.message)
  }
}
const handleFormSubmit = async(values, actions) => {

      
  //actions are values gotten 
  setActiveStep(activeStep + 1);

  //copies billing address to shipping address

  if (isFirstStep && values.billingAddress && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
          ...values.billingAddress,
          isSameAddress:true,
      })
  }
  
  if(isThirdStep){
    if (formValues==="Credit/Debit Cards"){
      makePayment(values)
     
    }
    if (formValues==="Pay On Delivery"){
      payOnDelivery(values)
    }
    if (formValues === ""){
      setActiveStep(activeStep-1)
      toast.error("Select a payment method")
    }
  
  actions.setTouched({});



  }
}


const quantity = useSelector((state) => state.cart.totalQuantity);


  const [isCartExpanded, setCartExpanded] = useState(false);

  const handleCartToggle = () => {
    setCartExpanded(!isCartExpanded);
  };




   

  return (
    <><>
    
      
      <div className='checkout'>
      

          
      <Box className="mainBox">

        <Box>

        </Box>
        <Stepper activeStep={activeStep} sx={{ m: "20px 0", fontSize: "15px" }}>
          <Step>
            {isSecondStep || isThirdStep || loading?
              <Check className='check' />
              :
              <LocalShipping className='contact' />}<span>Shipping</span>
          </Step>
          <Step>
            {isThirdStep || loading ?
              <Check className='check' />
              :
              <ContactPage className='contact' />}
            <span>Contact</span>
          </Step>
          <Step>
          {loading ? 
            <Check className='check' />
            :         
           <Payment className='contact' /> }
            <span>Payment</span>
          </Step>
        </Stepper>
        <Box>
          <Formik onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema[activeStep]}
          >

            {({
              values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue
            }) => (
              <form onSubmit={handleSubmit}>
                {isFirstStep && (<Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldValue={setFieldValue} />)}

                {isSecondStep && (
                  <Details
                    values={values}
                    touched={touched}
                    errors={errors}
                    handleBlur={handleBlur}
                    handleChange={handleChange} />
                )}

                {isThirdStep && (

                  <><FormControl errors={errors}>
                      <FormLabel
                        id="demo-controlled-radio-buttons-group"
                        sx={{ color: "black", fontSize:"25px"}}
                      >
                        <h5>Payment Method: </h5>{" "}
                      </FormLabel>

                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="paymentMethod"
                        value={formValues}
                        onChange={handleFormChange}
                        errors={errors}
                        sx={{fontSize:"20px"}}
                      >
                        <FormControlLabel
                          value="Credit/Debit Cards"
                          control={<Radio />}
                          label="Credit/Debit Cards (Stripe)" 
                          sx={{fontSize:"40px"}}/>
                        <FormControlLabel
                          value="Pay On Delivery"
                          control={<Radio />}
                          label="Pay On Delivery" 
                          fontSize="40px"/>
                      </RadioGroup>
                                      </FormControl>
                                          <div className='paymentSvg'>
                        <img src='img/about/payment.svg' alt='' />
                      </div></>

                )}



                <Box display="flex" justifyContent="space-between" gap="50px">
                  {isSecondStep && (
                    <>
                      <Button
                        onClick={() => setActiveStep(activeStep - 1)}
                        
                        type="submit"
                        color='primary'
                        variant='contained'
                        sx={{
                          backgroundColor: "rgba(0,0,0,0.4)",
                          color: "white",
                          borderRadius: 0,
                          padding: "10px 30px",
                          fontSize: "15px",
                          margin:"30px 0"
                        }}

                      >
                        Back
                      </Button>
                    </>

                  )}

                  

                  {isFirstStep ? 
                  <Button
                    
                    type="submit"
                    color='primary'
                    variant='contained'
                    className="next"
                    sx={{
                      backgroundColor: "rgba(0,0,0,0.4)",
                      color: "white",
                      borderRadius: 0,
                      padding: "10px 30px",
                      fontSize: "15px",
                      margin:"30px 10px 30px 400px"
                    }}
                  >
                    Next
                  </Button>
                  :
                  <Button
                    
                    type="submit"
                    color='primary'
                    variant='contained'
                    sx={{
                      backgroundColor: "rgba(0,0,0,0.4)",
                      color: "white",
                      borderRadius: 0,
                      padding: "10px 30px",
                      fontSize: "15px",
                      margin:"30px 0"
                    }}
                  >
                  { loading?"Placing order...": "Place order"}
                  </Button>
                  
                }


                </Box>
              </form>
            )}
          </Formik>
            
        </Box>
        

        <Box className="images">
        <img src='img/payment/f1.png' alt='' />
  
          <img src='/img/payment/f3.png' alt='' style={{marginRight:"1px"}}/>
          <img src='img/payment/f4.png' alt='' style={{marginRight:"1px"}}/>
          <img src='img/payment/f5.png' alt='' style={{marginRight:"1px"}}/>
          <img src='img/payment/f6.png' alt='' style={{marginRight:"1px"}}/>
        </Box>      
      </Box>

     


      <Box className="left">
      <div className="carts col-lg-6 h-100">
      <Box
        className="p-3"
        component="div"
        sx={{
          width: "100%",
        }}
      >
        <div
          className="pb-5"
          style={{
            overflowY: "auto",
            height: "18em",
          }}
        >
          <div>
            {cartItems.map((value, index) => {
              return (
                <ListItem
                  alignItems="flex-start"
                  secondaryAction={
                    <span className="d-flex flex-column">
                      
                        <Typography
                          variant="span"
                          sx={{ fontSize: "1.3em", padding: "5px 0" }}
                        >
                          SIZE: {value.size}
                        </Typography>
                      
                      <Typography
                        sx={{ fontSize: "1.3em", fontWeight: 400 }}
                      >
                        $ {(value.price * quantity).toFixed(2)}
                      </Typography>
                    </span>
                  }
                  sx={{ width: "100%" }}
                  key={index}
                >
                  <ListItemAvatar>
                    <Badge
                      badgeContent=<span>{value.count}</span>
                      color="primary"
                      sx={{borderRadius:"50%"}}
                      
                      
                    >
                    
                      
                    <div style={{ width: "100px", height: "100px" }}>
                    <ImageData item={value} />
                    </div>
                        
                    </Badge>
                  </ListItemAvatar>

                  <ListItemText
                    sx={{
                      fontSize: "1.1em",
                      margin: "auto 1em",
                      "& .MuiListItemText-primary": {
                        fontSize: "1.1em",
                        width: "70%",
                      },
                    }}
                    className='title'
                    primary={value.title}
                  />
                </ListItem>
              );
            })}
          </div>
        </div>


  
  <Divider />
  <Box sx={{display:"flex", justifyContent:"space-between", paddingTop:"30px"}}
  className="price">
        <p>SUBTOTAL</p>
        <h4>
        ${totalPrice.toFixed(2)}</h4>
         
        <p>TOTAL</p>
  <h4>${totalPrice.toFixed(2)}</h4>
        
  </Box>
  
  

  
  

  
  </Box>
  </div>




  <Box className="checkFooter">
  <h4 style={{fontSize:"20px"}}>Why Buy From Us?</h4>
  <div className="checkFooterRow">
  <img
  src="img/payment/g1.png"
  alt="guarantee"
  className='guarantee'
  
/>
    <div className="col-9 my-auto">
    
      <h4 style={{ fontSize: "0.8em" }}>
        <strong>100% Satisfaction Guarantee</strong>
      </h4>
      <p className='p'>
        If you are not 100% satisfied with your purchase, we
        will make it right! No questions asked!
      </p>
    </div>
  </div>
  <div className="checkFooterRow">
      <img
        src="img/payment/g2.png"
        alt="guarantee"
        className='guarantee'
        
      />
    <div className="col-9 my-auto">
      <h4 style={{ fontSize: "0.8em" }}>
        <strong>
          Over 400,000 Successfully Shipped Orders
        </strong>
      </h4>
      <p className='p'>
        We make customers happy with every order we ship. You
        simply have to join our family.
      </p>
    </div>
  </div>
  <hr />
  <div className="d-flex justify-content-between">
    <NavLink to="/returns" style={{ textDecoration: "none" ,padding:"40px", color:"var(--color-primary)"}}>
      Return Policy
    </NavLink>
    <NavLink to="/shipping" style={{ textDecoration: "none", padding:"40px", color:"var(--color-primary)" }}>
      Shipping Policy
    </NavLink>
  </div>
</Box>
</Box>

      
 

    </div>

    </></>
  )
}

export default Checkout
