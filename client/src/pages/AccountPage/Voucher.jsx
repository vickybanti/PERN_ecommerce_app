import React, { useState } from "react";
import "./account.scss";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import RedeemIcon from "@mui/icons-material/Redeem";
import { Button } from "@mui/material";

function Voucher() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography component="div">{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  return (
    <div className="card main-card">
      <div className="card-header header">Voucher</div>

      <div className="container">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                label="ACTIVE"
                sx={{
                  fontSize: "1.2em",
                }}
                {...a11yProps(0)}
              />
              <Tab
                label="INACTIVE"
                sx={{ fontSize: "1.2em" }}
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <div
              className="d-flex justify-content-center pt-5"
              style={{ textAlign: "center" }}
            >
              <div>
                <div
                  style={{
                    background: "rgba(30, 40, 50, 0.05)",
                    padding: "1em",
                    height: "8em",
                    width: "8em",
                    borderRadius: "50%",
                    margin: "auto",
                  }}
                >
                  <RedeemIcon
                    sx={{
                      fontSize: "6em",
                      color: "skyblue",
                      transform: "rotate(50deg)",
                    }}
                  />
                </div>
                <p className="card-title pt-3 pb-2">
                  You currently have no available Voucher
                </p>
                <p className="card-text pb-4">
                  All your available Vouchers will be displayed here
                </p>
                <Button
                  variant="contained"
                  sx={{
                    fontSize: "1rem",
                    backgroundColor: "skyblue",
                    "&:hover": {
                      backgroundColor: "#4a90e2",
                    },
                  }}
                >
                  CONTINUE SHOPPING
                </Button>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div
              className="d-flex justify-content-center pt-5"
              style={{ textAlign: "center" }}
            >
              <div>
                <div
                  style={{
                    background: "rgba(30, 40, 50, 0.05)",
                    padding: "1em",
                    height: "8em",
                    width: "8em",
                    borderRadius: "50%",
                    margin: "auto",
                  }}
                >
                  <RedeemIcon
                    sx={{
                      fontSize: "6em",
                      color: "skyblue",
                      transform: "rotate(50deg)",
                    }}
                  />
                </div>
                <p className="card-title pt-3 pb-2">
                  You currently have no available Voucher
                </p>
                <p className="card-text pb-4">
                  All your available Vouchers will be displayed here
                </p>
                <Button
                  variant="contained"
                  sx={{
                    fontSize: "1rem",
                    backgroundColor: "skyblue",
                    "&:hover": {
                      backgroundColor: "#4a90e2",
                    },
                  }}
                >
                  CONTINUE SHOPPING
                </Button>
              </div>
            </div>
          </TabPanel>
        </Box>
      </div>
    </div>
  );
}

export default Voucher;
