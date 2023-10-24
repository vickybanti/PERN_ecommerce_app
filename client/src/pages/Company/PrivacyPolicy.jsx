import React from "react";

import { Box, Fab, Fade, useScrollTrigger } from "@mui/material/";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

function PrivacyPolicy() {
  return (
    <>
      <div sx={{ padding: 0, margin: 0 }} id="back-to-top-anchor" />
      <div style={{ backgroundColor: "rgba(30, 40, 50, 0.05)" }}>
        <div
          className="container pt-3 pb-5 pay-info"
          style={{ fontSize: "13px" }}
        >
          <h1 className="main-header py-5">Privacy Policy</h1>
          <p>
            Ayaba is compliant with The General Data Protection Regulation
            (GDPR) (EU) 2016/679.
          </p>
          <p>
            It means that we are open about our methods of tracking and use of
            the visitors’ personal data, and you can freely check what exactly
            we’re doing to it.
          </p>
          <p>At shynster.com, we collect:</p>
          <ul>
            <li>
              <p>Your name and surname</p>{" "}
            </li>
            <li>
              {" "}
              <p>Your email address</p>{" "}
            </li>
            <li>
              {" "}
              <p>Your physical address</p>{" "}
            </li>
            <li>
              <p>
                The data about the browser and device you use to view the store
              </p>
            </li>

            <li>
              <p>The way you navigate the store</p>
            </li>
          </ul>
          <p>
            We gather your contact details because they are necessary to accept
            and process your orders, and to make sure you’ve got your packages.
          </p>
          <p>
            We gather the details of your technical equipment and on-site
            behavior in order to make our store more user-friendly, and to
            personalize our store services for you (for example, to
            automatically switch the store to the mobile version.)
          </p>
          <p>
            Our store works with outer companies that help us provide the best
            service for you, and these third parties also use some of the
            personal details you’re leaving. We limit the data they can access
            to only what is necessary for them to perform their obligations.
          </p>
          <ul>
            <li>
              <p>
                Payment services use your credit card number, your name and
                surname to verify and process your payments for our products
              </p>{" "}
            </li>
            <li>
              <p>
                Our manufacturers and stock keepers use the data of your order
                contents to assemble the necessary package for you
              </p>{" "}
            </li>
            <li>
              <p>
                Postal services use your first name, last name, and physical
                address to arrange the product delivery for you
              </p>{" "}
            </li>
            <li>
              <p>
                {" "}
                Mass mailing services use your email address to send you emails
                (if you have subscribed for them)
              </p>{" "}
            </li>
          </ul>
          <p>
            If you keep browsing our webstore after reading this Privacy Policy,
            you give us the consent to use your personal details for the
            purposes explained above.
          </p>
          <p>If you don’t agree to these terms, please leave the website.</p>
          <p>You can email us at support@shynster.com and ask:</p>
          <ul>
            <li>
              <p>
                To receive the copy of your personal details we have collected
              </p>{" "}
            </li>
            <li>
              <p>To delete your personal details from our system</p>{" "}
            </li>
            <li>
              <p>
                To withdraw your consent (if you previously agreed to provide us
                with the data, but then changed your mind)
              </p>{" "}
            </li>
          </ul>
          <p>
            We are doing our best to guarantee the security of your personal
            details while keeping and using them.
          </p>
          <p>Thank you for your cooperation!</p>
        </div>
      </div>
      <ScrollTop>
        <Fab size="large" aria-label="scroll back to top">
          <KeyboardArrowUpIcon sx={{ fontSize: 40 }} />
        </Fab>
      </ScrollTop>
    </>
  );
}

export default PrivacyPolicy;
