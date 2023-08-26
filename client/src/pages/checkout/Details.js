
import {Box, Typography, TextField} from "@mui/material"
import React from 'react'
import "./Checkout.scss"

function Details({
    values,
    touched,
    errors,
    handleBlur,
    handleChange}) {
  return (
    <Box>
      <Box className="boxes">
        <Typography sx={{mb: "15px"}} fontSize="18px">
            Contact Info
        </Typography>

        <TextField  
            fontSize="20px"
            fullWidth
            type="text"
            label="Email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            name="email"
            // !! coverts to a boolean forcefully
            error={!!touched.email && !!errors.email}
            helperText={touched.email && errors.email }
            sx={{ gridColumn:"span 4", marginBottom:"15px"}}
            />
            <TextField  
            fullWidth
            type="text"
            label="Phone Number"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.phoneNumber}
            name="phoneNumber"
            // !! coverts to a boolean forcefully
            error={!!touched.phoneNumber && !!errors.phoneNumber}
            helperText={touched.email && errors.email }
            sx={{ gridColumn:"span 4"}}
            />
      </Box>
    </Box>
  )
}

export default Details
