const nodemailer = require("nodemailer");

const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
  try {
    const transporter = nodemailer.createTransport({
      service:"gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use false if port is 587, true if port is 465
      auth: {
        user: "olamuyiwavictor@gmail.com",
        pass: "njqx mldf krli mscd",
        
      },
      tls: {
        rejectUnauthorized: false,
      },

    });

    const options = {
      from: sent_from,
      to: send_to,
      replyTo: reply_to,
      subject: subject,
      html: message,
    };

    // Send Email
    const info = await transporter.sendMail(options);
    console.log("Email sent successfully:", info.response);
  

  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
