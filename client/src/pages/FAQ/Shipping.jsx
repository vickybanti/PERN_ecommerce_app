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

function Shipping() {
  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
       <div sx={{ padding: 0, margin: 0 }} id="back-to-top-anchor" />
      <div style={{ backgroundColor: "rgba(30, 40, 50, 0.05)" }}>
        <div className="container faq">
          <h1 className="main-header pt-3 pb-5">shipping & delivery</h1>
          <div className="pb-5">
            <img
              src="img/about/delivery.svg"
              alt=""
              style={{ height: "120px", width: "100%" }}
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
                  <b>How do you ship packages?</b>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <span style={{ fontSize: "15px" }}>
                    Currently, we offer shipping across the U.S. only. Packages
                    from our U.S. warehouse are shipped through USPS.
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
                  <b>How long does shipping take?</b>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <span style={{ fontSize: "15px" }}>
                    All orders require 1 business day processing time. The
                    estimated delivery time is 1-3 business days.
                  </span>
                </Typography>
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
                  <b>Do you provide tracking information?</b>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <span style={{ fontSize: "15px" }}>
                    Yes, you will receive an email with your tracking
                    information.
                  </span>
                </Typography>
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
                  <b>Will my items be sent in one package?</b>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <span style={{ fontSize: "15px" }}>
                    Yes. <br />
                    If you have any other questions, please contact us and we
                    will do our best to help you out.
                  </span>
                </Typography>
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

export default Shipping;
