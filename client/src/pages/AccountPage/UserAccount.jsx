import React, { useState } from "react";
import "./account.scss";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Fab,
  Fade,
  useScrollTrigger,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import InventoryIcon from "@mui/icons-material/Inventory";
import RateReviewIcon from "@mui/icons-material/RateReview";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, Outlet } from "react-router-dom";
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

function UserAccount() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <div sx={{ padding: 0, margin: 0 }} id="back-to-top-anchor" />
      <div style={{ backgroundColor: "rgba(30, 40, 50, 0.05)" , paddingTop: "15em"}}>
        <div className="container  py-5" style={{ paddingTop: "2em" }}>
          <div className="row py-5 g-4">
            <div className="col-md-3 ">
              <Box
                component="div"
                sx={{
                  height: "100%",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderRadius: "5px",
                  backgroundColor: "rgba(0,0,0,0.1)",
                }}
              >
                <List sx={{ margin: 0, paddingTop: 0 }}>
                  <Link
                    to="summary"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItem disablePadding>
                      <ListItemButton
                        selected={selectedIndex === 0}
                        onClick={(event) => handleListItemClick(event, 0)}
                        sx={{
                          minHeight: 48,
                          py: 3,
                          backgroundColor:
                            selectedIndex === 0 ? "#4a90e2" : "transparent",
                            
                        
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: "1em",
                            justifyContent: "center",
                          }}
                        >
                          <PersonOutlineIcon sx={{ fontSize: 30 }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="My Ayaba Account"
                          primaryTypographyProps={{ fontSize: "20px", 
                          fontFamily:"fantasy", letterSpacing:"2px" }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                  <Divider sx={{ backgroundColor: "gray" }} />
                  <Link
                    to="orders"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItem disablePadding>
                      <ListItemButton
                        selected={selectedIndex === 1}
                        onClick={(event) => handleListItemClick(event, 1)}
                        sx={{
                          minHeight: 48,
                          py: 3,
                          backgroundColor:
                            selectedIndex === 1 ? "#4a90e2" : "transparent",
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: "1em",
                            justifyContent: "center",
                          }}
                        >
                          <InventoryIcon sx={{ fontSize: 30 }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Orders"
                          primaryTypographyProps={{ fontSize: "17px", 
                          fontFamily:"fantasy" }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                  <Link
                    to="reviews"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItem disablePadding>
                      <ListItemButton
                        selected={selectedIndex === 2}
                        onClick={(event) => handleListItemClick(event, 2)}
                        sx={{
                          minHeight: 48,
                          py: 3,
                          backgroundColor:
                            selectedIndex === 2 ? "#4a90e2" : "transparent",
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: "1em",
                            justifyContent: "center",
                          }}
                        >
                          <RateReviewIcon sx={{ fontSize: 30 }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Pending Reviews"
                          primaryTypographyProps={{ fontSize: "17px", 
                          fontFamily:"fantasy" }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                  <Link
                    to="vouchers"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItem disablePadding sx={{ display: "block" }}>
                      <ListItemButton
                        selected={selectedIndex === 3}
                        onClick={(event) => handleListItemClick(event, 3)}
                        sx={{
                          minHeight: 48,
                          py: 3,
                          backgroundColor:
                            selectedIndex === 3 ? "#4a90e2" : "transparent",
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: "1em",
                            justifyContent: "center",
                          }}
                        >
                          <LocalActivityIcon sx={{ fontSize: 30 }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Voucher"
                          primaryTypographyProps={{ fontSize: "17px", 
                          fontFamily:"fantasy" }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                  <Link
                    to="saved"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItem disablePadding>
                      <ListItemButton
                        selected={selectedIndex === 4}
                        onClick={(event) => handleListItemClick(event, 4)}
                        sx={{
                          minHeight: 48,
                          py: 3,
                          backgroundColor:
                            selectedIndex === 4 ? "#4a90e2" : "transparent",
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: "1em",
                            justifyContent: "center",
                          }}
                        >
                          <FavoriteBorderIcon sx={{ fontSize: 30 }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Saved Items"
                          primaryTypographyProps={{ fontSize: "17px", 
                          fontFamily:"fantasy" }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                  <Divider sx={{ backgroundColor: "gray" }} />
                  <Link
                    to="manage"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItem disablePadding>
                      <ListItemButton
                        selected={selectedIndex === 5}
                        onClick={(event) => handleListItemClick(event, 5)}
                        sx={{
                          minHeight: 48,
                          py: 3,
                          backgroundColor:
                            selectedIndex === 5 ? "#4a90e2" : "transparent",
                        }}
                      >
                   
                        <ListItemText
                          primary="Address Book"
                          primaryTypographyProps={{ fontSize: "17px", 
                          fontFamily:"fantasy" }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                  <Link
                    to="newsletter"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItem disablePadding>
                      <ListItemButton
                        selected={selectedIndex === 7}
                        onClick={(event) => handleListItemClick(event, 7)}
                        sx={{
                          minHeight: 48,
                          py: 3,
                          backgroundColor:
                            selectedIndex === 7 ? "#4a90e2" : "transparent",
                        }}
                      >
                        <ListItemText
                          primary="NewsLetter Preference"
                          primaryTypographyProps={{ fontSize: "17px", 
                          fontFamily:"fantasy" }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                  <Link
                    to="close"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItem disablePadding>
                      <ListItemButton
                        selected={selectedIndex === 8}
                        onClick={(event) => handleListItemClick(event, 8)}
                        sx={{
                          minHeight: 48,
                          py: 3,
                          backgroundColor:
                            selectedIndex === 8 ? "#4a90e2" : "transparent",
                        }}
                      >
                        <ListItemText
                          primary="Close Account"
                          primaryTypographyProps={{ fontSize: "17px", 
                          fontFamily:"fantasy" }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                  <Divider sx={{ backgroundColor: "gray" }} />
                  
                </List>
              </Box>
            </div>
            <div className="col-md-9">
              <Box
                component="div"
                sx={{
                  height: "100%",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderRadius: "5px",
                  padding: 0,
                  backgroundColor: "white",
                }}
              >
                <Outlet />
              </Box>
            </div>
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

export default UserAccount;
