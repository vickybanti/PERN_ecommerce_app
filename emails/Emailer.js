import { render } from '@react-email/render';
import nodemailer from 'nodemailer';
import Email from './Email';

import React from 'react'

async function Emailer() {
    const transporter = nodemailer.createTransport({
        host: 'smtp.forwardemail.net',
        port: 465,
        secure: true,
        auth: {
          user: 'olamuyiwavictor@gmail.com',
          pass: 'Victormania@1',
        },
      });
      
      const emailHtml = render(<Email url="www.gmail.com" />);
      
      const options = {
        from: 'olamuyiwavictor@gmail.com',
        to: 'olamuyiwavictor@gmail.com',
        subject: 'hello world',
        html: emailHtml,
      };
      
      await transporter.sendMail(options);
      
}

export default Emailer


