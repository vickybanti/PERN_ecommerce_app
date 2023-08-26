import React from "react";
import { Button } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useNavigate } from "react-router-dom";

function MainImage() {
  const navigate = useNavigate();

  return (
    <div
      className="container-fluid"
      style={{ backgroundColor: "rgba(30, 40, 50, 0.05)" }}
    >
      <div className="row">
        <div className="col-lg-6">
          <div className="py-5 main-title">
            <h1
              className="animate__animated animate__lightSpeedInLeft"
              style={{ animationDelay: "1s" }}
            >
              Collections
            </h1>
            <p
              className="animate__animated animate__lightSpeedInRight"
              style={{ animationDelay: "2s" }}
            >
              Embark on a Technological Adventure: Experience the Ultimate
              Fusion of Innovation and Style with our Spectacular Range of
              Laptops, TVs, and Gaming Chairs!
            </p>
            <Button
              color="primary"
              onClick={() => navigate("/products/")}
              variant="contained"
              className="animate__animated animate__fadeInUp"
              style={{
                animationDelay: "3s",
                width: "14em",
                height: "4.5em",
                backgroundColor: "#1E2832",
                fontSize: "1.2em",
              }}
              startIcon={<ShoppingBagIcon />}
            >
              Shop Now
            </Button>
          </div>
        </div>
        <div className="col-lg-6 px-lg-5 img-wrapper">
          <img
            className=" title-img"
            src="https://images.unsplash.com/photo-1536412597336-ade7b523ecfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
            alt="advert"
          />
        </div>
      </div>
    </div>
  );
}

export default MainImage;
