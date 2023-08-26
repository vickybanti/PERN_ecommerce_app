import {Box, useMediaQuery, Input} from "@mui/material"
import {getIn} from "formik"


const AddressForm = ({
            type,
            errors,
            values,
            touched,
            handleBlur,// ahndles when u click out of a field
            handleChange,// handles the changes in a value of a field
            
}) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    
    const formattedName = (field)=> `${type}.${field}`
    //type is either billing/shipping address

    const formattedError = (field) =>
    //getIn grabs the field and the boolean checks if the formatted name is touched and 
    //returns true(boolean) when touched
    Boolean(
        getIn(touched, formattedName(field)) && 
        getIn(errors, formattedName(field))
    );
//returns an eror after the formatted error is activated
    const formattedHelper = (field) => 
    getIn(touched, formattedName(field)) && 
    getIn(errors, formattedName(field))

    return (
        <Box
            display="grid"
            gap="15px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"//splits the grid to four fractions and repeat 
            //with min is 0 and max is 1 fraction(25%)
            sx={{
                "& > div": {gridColumn: isNonMobile ? undefined : "span 4"} ,//& target the child div and if its is not mobile it remains d same but if it is mobile, span is 4
                
            }}
        >
        <Input 
            fullWidth
            required
            type="text"
            placeholder="first name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.firstName}
            name={formattedName("firstName")}
            error={formattedError("firstName")}
            helperText={formattedHelper("firstName")}
            sx={{gridColumn:"span 2", fontSize:"20px"}}
            />
            <Input  
            fullWidth
            required
            type="text"
            placeholder="last name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.lastName}
            name={formattedName("lastName")}
            error={formattedError("lastName")}
            helperText={formattedHelper("lastName")}
            sx={{gridColumn:"span 2", fontSize:"20px"}}

            />
            <Input  
            fullWidth
            required
            type="text"
            placeholder="country"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.country}
            name={formattedName("country")}
            error={formattedError("country")}
            helperText={formattedHelper("country")}
            sx={{gridColumn:"span 2", fontSize:"20px"}}
            />

            <Input  
            required
            fullWidth
            type="text"
            placeholder="street1"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.street1}
            
            name={formattedName("street1")}
            error={formattedError("street1")}
            helperText={formattedHelper("street1")}
            sx={{gridColumn:"span 2", fontSize:"20px"}}
            />

            
            <Input  
            required
            fullWidth
            type="text"
            placeholder="street2"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.street2}
            name={formattedName("street2")}
            error={formattedError("street2")}
            helperText={formattedHelper("street2")}
            sx={{gridColumn:"span 2", fontSize:"20px"}}
            />

            
            <Input  
            required
            fullWidth
            type="text"
            placeholder="city"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.city}
            name={formattedName("city")}
            error={formattedError("city")}
            helperText={formattedHelper("city")}
            sx={{gridColumn:"span 2", fontSize:"20px"}}
            />

            <Input  
            required
            fullWidth
            type="text"
            placeholder="state"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.state}
            name={formattedName("state")}
            error={formattedError("state")}
            helperText={formattedHelper("state")}
            sx={{gridColumn:"span 2", fontSize:"20px"}}
            />

        
        </Box>
    )
}

export default AddressForm