import React from 'react'
import {Box, Checkbox, FormControlLabel, Typography} from "@mui/material"

import AddressForm from './AddressForm';

const Shipping =  ({
    
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue,
  
}) => {
    return (
        <Box m="30px auto">
        <Box>
            <Typography sx={{mb:"15px",fontSize:"18px"}} >
                Shipping Information
            </Typography>
            <AddressForm type="billingAddress"

            values={values.billingAddress}//keeps track of whatever the user is typing
            errors={errors}
            touched={touched}// activated when a field is touched or clicked
            handleBlur={handleBlur}// ahndles when u click out of a field
            handleChange={handleChange}// handles the changes in a value of a field
            setFieldValue={setFieldValue}
            sx={{mb:"15px",fontSize:"18px"}}
            />
            </Box>
            

            
        </Box>
    )
}

export default Shipping
