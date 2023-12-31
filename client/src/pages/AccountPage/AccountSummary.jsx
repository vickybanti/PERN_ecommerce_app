import React, { useEffect, useState } from "react";
import "./account.scss";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import EditIcon from "@mui/icons-material/Edit";
import { Button, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeRequest } from "../../makeRequest";

function AccountSummary() {
  const user = useSelector((state) => state.auth.userID);
  const navigate = useNavigate();
  console.log(user);

  const [users, setGetUser] = useState([])
  console.log(users)


  // const [orders, setOrders] = useState([])


  // useEffect(() => {
  //   const getOrders = async()=>{

    
  //   try {
  //     const response = await fetch(`http://localhost:5000/order/${user}`,{
  //       method: "GET",
  //     })
  //     const  allOrders = await response.json()

  //     setOrders(allOrders)
  //   } catch (err) {
  //     console.error(err.message)
  //   }
  // }
  // getOrders()
  // }, [user])

  useEffect(() => {
    const getUser = async()=>{

    
    try {
      const response = await makeRequest.get(`/auth/user/${user}`)
      const  res = await response.data

      setGetUser(res)
    } catch (err) {
      console.error(err.message)
    }
  }
  getUser()
  }, [user])
  //console.log(orders)
  return (
    <><div className="card-image">
      <img src="/uploads/shoes/leather shoe banner.jpg" alt=""  />
    </div>
    
    <div className="main-card">
        <h2 className="overview">Account Overview</h2>


        <div className="card-container">
          <div className="card-top">
            <div className="col-md-6 ">
          
              <div className="card-h-100">
                <p className="card-heading">ACCOUNT DETAILS</p>
                <div className="card-body">
                  
                    <>
                      <div className="card-title">
                        <h3>First name</h3>
                        <p>{users?.firstname}</p>
                      </div>

                      <div className="card-title">
                        <h3>Last name</h3>
                        <p>{users?.lastname}</p>
                      </div>

                      <div className="card-title">
                        <h3>Email</h3>
                        <p>{users?.email}</p>
                      </div></>
                  

                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-heading">
                  ADDRESS BOOK
                  <Link
                    to="/profile/new-address"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <IconButton>
                      <EditIcon sx={{ color: "#007bff", fontSize: "15px" }} />
                    </IconButton>
                  </Link>
                </div>
                <div className="card-body">
                  <div className="card-title">
                    <h4>Your default shipping address:</h4>

                    
                      <>
                        <p style={{
                          fontSize: "15px",
                          color: "gray"
                        }}> {users.street}</p>
                        <br />
                        <p style={{
                          fontSize: "15px",
                          color: "gray"
                        }}>
                          {users.city}
                        </p>
                        <br />
                        <p style={{
                          fontSize: "15px",
                          color: "gray"
                        }}>
                          {users.state}
                        </p>
                        <br />
                        <p style={{
                          fontSize: "15px",
                          color: "gray"
                        }}>
                          {users.country}
                        </p>
                      </>
                    
                  </div>
                </div>

              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100">
                <p className="card-heading">MOORE STORE CREDIT</p>
                <div className="card-body">
                  <div className="card-credit">
                    <AccountBalanceWalletIcon
                      sx={{
                        marginRight: "0.5rem",
                        fontSize: "7rem",
                        color: "#071b28",
                      }} />
                    <span style={{ fontSize: "3.2rem" }}>$ 0.00</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 ">
              <div className="card h-100">
                <p className="card-heading">NEWSLETTER</p>
                <div className="card-body">
                  <p style={{
                    fontSize: "15px",
                    color: "gray",
                  }}>
                    You are currently not subscribed to any of our newsletters.
                  </p>
                </div>
                <div className="card-footer" style={{ border: "none" }}>
                  <Button
                    variant="text"
                   className="newsletter"
                  
                    onClick={() => navigate("/profile/newsletter")}
                  >
                    EDIT NEWSLETTER REFERENCE
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div></>
  );
}

export default AccountSummary;
