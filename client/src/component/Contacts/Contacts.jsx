import React from 'react'
import './Contacts.scss'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';

function Contacts() {
  return (
    <div className='contact'>
        <div className="wrapper">
            <span>BE IN TOUCH WITH US</span>
            <div className='mail'>
                <input type='text' placeholder="Enter your email...." />
                <button>JOIN US</button>

            </div>
            <div className='icons'>
                <FacebookIcon />
                <TwitterIcon />
                <InstagramIcon />
                <PinterestIcon />
            </div>
        </div>
      
    </div>
  )
}

export default Contacts
