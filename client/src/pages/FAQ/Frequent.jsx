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

function Frequent() {
  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <>
      <div sx={{ padding: 0, margin: 0 }} id="back-to-top-anchor" />
      <div style={{ backgroundColor: "rgba(30, 40, 50, 0.05)" }}>
        <div className="container faq">
          <h1 className="main-header pt-3 pb-5">frequently asked questions</h1>
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
                  <b>How to search products?</b>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <span style={{ fontSize: "3em" }}>
                    Search for products by entering the product name or keyword
                    into the Search Bar at the top of any page. Try to enter a
                    general description. The more keywords you use, the less
                    products you will get in the results page. When you find a
                    product you’re interested in, simply click the product name
                    or the product image for more details.
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
                  <b>What is Buyer Protection?</b>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <span style={{ fontSize: "10px" }}>
                  Buyer Protection is a set of guarantees that enables buyers to
                  shop with confidence on our website.
                </span>
                <span style={{ fontSize: "10px" }}>You are protected when:</span>
                <ul>
                  <li aria-level="1">
                    <span style={{ fontSize: "10px" }}>
                      The item you ordered did not arrive within the time
                      promised by the seller.
                    </span>
                  </li>
                  <li aria-level="1">
                    <span style={{ fontSize: "10px" }}>
                      The item you received was not as described.
                    </span>
                  </li>
                  <li aria-level="1">
                    <span style={{ fontSize: "10px" }}>
                      The item you received that was assured to be genuine was
                      fake.
                    </span>
                  </li>
                </ul>
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

export default Frequent;
