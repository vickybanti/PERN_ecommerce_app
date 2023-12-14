import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Box, Button, Stepper, Step, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, Divider, TextField, Typography } from "@mui/material";
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
  
  

function Checkout() {
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

      
async function makePayment(values) {
    
const newRequestBody = {
  userId,
  email:values.email,
  cart: cartItems,
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

 
    navigate("/payment?requestBody=" + encodeURIComponent(JSON.stringify(newRequestBody)));
    setLoading(true)

  


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





   

  return (
    <><>
    
      
      <div className='checkout'>
      

      <Box className="left">
      <Box className="carts">
      <h2 style={{color:"teal"}}>My items</h2>
      <div className='my-cart'>
            {cartItems.map((item) => (
        <>
        <Box flex="1 1 30%" mt={"40px"}>
                <div style={{width:"40%", height:"40%"}}>
                  <ImageData item={item} />
                </div>
        </Box>

        <h4>  {item.title}</h4><p>Price: {item.price}</p></>
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
  
  </Box>




  <Box className="checkFooter">
  <h4 className="py-2">Why Buy From Us?</h4>
  <div className="checkFooterRow">
  <img
  src="img/payment/g1.png"
  alt="guarantee"
  className='guarantee'
  
/>
    <div className="col-9 my-auto">
    
      <h4 style={{ fontSize: "0.9em" }}>
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
      <h4 style={{ fontSize: "0.9em" }}>
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
    <NavLink to="/returns" style={{ textDecoration: "none" ,padding:"40px"}}>
      Return Policy
    </NavLink>
    <NavLink to="/shipping" style={{ textDecoration: "none", padding:"40px" }}>
      Shipping Policy
    </NavLink>
  </div>
</Box>
</Box>






  
      
      <Box className="mainBox">

        <Box>

        </Box>
        <Stepper activeStep={activeStep} sx={{ m: "20px 0", fontSize: "80px" }}>
          <Step>
            {isSecondStep || isThirdStep || loading?
              <Check className='check' />
              :
              <LocalShipping className='contact' />}<h4>Shipping</h4>
          </Step>
          <Step>
            {isThirdStep || loading ?
              <Check className='check' />
              :
              <ContactPage className='contact' />}
            <h4>Contact</h4>
          </Step>
          <Step>
          {loading ? 
            <Check className='check' />
            :
           
            <Payment className='contact' /> }
            <h4>Payment</h4>
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
                    </FormControl><div className='paymentSvg'>
                        <img src='img/about/payment.svg' alt='' />
                      </div></>

                )}



                <Box display="flex" justifyContent="space-between" gap="50px">
                  {isSecondStep && (
                    <>
                      <Button
                        onClick={() => setActiveStep(activeStep - 1)}
                        fullWidth
                        type="submit"
                        color='primary'
                        variant='contained'
                        sx={{
                          backgroundColor: "rgba(0,0,0,0.4)",
                          color: "white",
                          borderRadius: 0,
                          padding: "10px 30px",
                          fontSize: "15px",
                          margin: "20px 0"
                        }}

                      >
                        Back
                      </Button>
                    </>

                  )}

                  <Button
                    fullWidth
                    type="submit"
                    color='primary'
                    variant='contained'
                    sx={{
                      backgroundColor: "rgba(0,0,0,0.4)",
                      color: "white",
                      borderRadius: 0,
                      padding: "10px 30px",
                      fontSize: "15px",
                      margin: "20px 0"
                    }}



                  >
                    {loading?"Placing order...":isFirstStep ? "Next" : "Place order"}
                  </Button>


                </Box>
              </form>
            )}
          </Formik>
        </Box>
                    
      </Box>
      
 

    </div>
    <div className='images'>
        <img src='img/payment/f1.png' alt='' />

        <img src='img/payment/f3.png' alt='' />
        <img src='img/payment/f4.png' alt='' />
        <img src='img/payment/f5.png' alt='' />
        <img src='img/payment/f6.png' alt='' />

      </div>
    </></>
  )
}

export default Checkout
