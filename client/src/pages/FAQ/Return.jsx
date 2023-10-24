import React, { useState } from "react";
import './faq.css'

import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { Box, Fab, Fade, useScrollTrigger, Typography } from "@mui/material/";
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

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function Return() {
  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <>
      <div sx={{ padding: 0, margin: 0 }} id="back-to-top-anchor" />
      <div style={{ backgroundColor: "rgba(30, 40, 50, 0.05)" }}>
        <div className="container faq">
          <h3 className="main-header pt-3 pb-5">refund and returns policy</h3>
          <div className="pb-5">
            <img
              src="img/about/return.svg"
              alt=""
              style={{ height: "140px", width: "100%" }}
            />
          </div>
          <div>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography sx={{ fontSize: "20px" }}>
                  <b>Order cancellation</b>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <span style={{ fontSize: "15px" }}>
                    All orders can be canceled until they are processed and
                    shipped. Once the packaging and shipping process has
                    started, it can no longer be canceled.
                  </span>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                aria-controls="panel2d-content"
                id="panel2d-header"
              >
                <Typography sx={{ fontSize: "20px" }}>
                  <b>Refunds</b>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <p>
                  <span style={{ fontSize: "15px" }}>
                    Your customer satisfaction is our #1 priority. We want you
                    to fulfil orders with confidence. That's why we proudly
                    offer absolute satisfaction guarantees that ensure our
                    customers will receive a purchased item on time and as
                    described.
                  </span>
                </p>
                <p>
                  <span style={{ fontSize: "15px" }}>
                    Our primary goal is making our customers happy, so everyone
                    who shops with us receives the following guarantees:
                  </span>
                </p>
                <ul>
                  <li aria-level="1">
                    <span style={{ fontSize: "15px" }}>
                      Refund if the item is not as described or damaged;
                    </span>
                  </li>
                  <li aria-level="1">
                    <span style={{ fontSize: "15px" }}>
                      Refund minus the shipping cost if our customer does not
                      want the product he received. Our customer must return the
                      item at his expense to our warehouse and the item must be
                      unused.
                    </span>
                  </li>
                </ul>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <AccordionSummary
                aria-controls="panel3d-content"
                id="panel3d-header"
              >
                <Typography sx={{ fontSize: "20px" }}>
                  <b>
                    Refunds are not available under the following circumstances:
                  </b>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ul>
                  <li aria-level="1">
                    <span style={{ fontSize: "15px" }}>
                      Your order does not arrive due to an incorrect address
                      provided by the customer;
                    </span>
                  </li>
                  <li aria-level="1">
                    <span style={{ fontSize: "15px" }}>
                      Your order does not arrive due to exceptional
                      circumstances beyond our control (e.g. delayed by a
                      natural disaster).
                    </span>
                  </li>
                </ul>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
            >
              <AccordionSummary
                aria-controls="panel4d-content"
                id="panel4d-header"
              >
                <Typography sx={{ fontSize: "20px" }}>
                  <b>
                    How do refunds, returns, and exchanges work on our website?
                  </b>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ul>
                  <li aria-level="1">
                    <b>In case you report a damaged or incorrect product,</b>
                    <span style={{ fontSize: "15px" }}>
                      {" "}
                      you are required to submit photo evidence within 14 days
                      of receiving the item. If the claim is approved, a refund
                      will be issued.
                    </span>
                  </li>
                  <li aria-level="1">
                    <b>
                      If the product packaging is damaged but the product itself
                      is intact,{" "}
                    </b>
                    <span style={{ fontSize: "15px" }}>
                      you must submit a claim to the shipping carrier directly.
                    </span>
                  </li>
                  <li aria-level="1">
                    <b>Missing order:</b>
                    <span style={{ fontSize: "15px" }}>
                      {" "}
                      In case a package is delivered (based on tracking number
                      update) but you claim that you did not receive the item,
                      you must submit a claim to the shipping carrier directly.
                      As a retailer, your orders will be deemed delivered and in
                      satisfactory condition if you do not report the issue
                      within the time frame.
                    </span>
                  </li>
                </ul>
                <p>
                  <span style={{ fontSize: "15px" }}>
                    If you experienced any of the above scenarios, you must
                    report the issue within 14 days of receipt. Otherwise, you
                    agree that the product is deemed delivered and satisfactory.
                  </span>
                </p>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel5"}
              onChange={handleChange("panel5")}
            >
              <AccordionSummary
                aria-controls="panel5d-content"
                id="panel5d-header"
              >
                <Typography sx={{ fontSize: "20px" }}>
                  <b> How do I request a refund, return, or exchange?</b>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <span style={{ fontSize: "15px" }}>
                  Handling returns is an essential part of running a business.
                  We are here to help! We have put together the following steps
                  to make this process easier:
                </span>
                <ol>
                  <li aria-level="1">
                    <span style={{ fontSize: "15px" }}>
                      In the event of a refund, return, or exchange request from
                      you, contact our Customer Support team via email at
                      support@shynster.com and include the evidence if required.
                    </span>
                  </li>
                  <li aria-level="1">
                    <span style={{ fontSize: "15px" }}>
                      After we have approved the order refund, return, or
                      exchange, the product must be returned to our address.
                    </span>
                  </li>
                  <li aria-level="1">
                    <span style={{ fontSize: "15px" }}>
                      You must return the product and provide a tracking number.
                    </span>
                  </li>
                  <li aria-level="1">
                    <span style={{ fontSize: "15px" }}>
                      Once the tracking number has been provided (or once we
                      have received the returned product), a replacement product
                      will be shipped or a refund minus the shipping cost will
                      be credited back to the card.
                    </span>
                  </li>
                </ol>
              </AccordionDetails>
            </Accordion>
          </div>
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

export default Return;
