/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, IconButton, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import "../account.css";
import { RateCard } from "../../../components/Cards/ProductCard/ProductCard";
import { publicRequest, userRequest } from "../../../axiosRequest";
import { useSelector } from "react-redux";

function ReviewProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const [reviewInfo, setReviewInfo] = useState({
    title: "",
    userName: "",
    description: "",
  });

  const [product, setProduct] = useState([]);
  const [value, setValue] = useState(0);
  const id = location.pathname.split("/")[3];
  const user = useSelector((state) => state.user.currentUser._id);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setReviewInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const review = {
    userId: user,
    productId: id,
    reviewInfo,
    rating: value,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await userRequest.post("reviews", review);
      navigate("/profile/reviews");
    } catch (error) {}
  };

  useEffect(() => {
    const getProductDetails = async () => {
      const res = await publicRequest.get(`products/find/${id}`);

      setProduct(res.data);
    };

    getProductDetails();
  }, [id]);

  return (
    <div className="card main-card">
      <p className="card-header header">
        <IconButton onClick={() => navigate("/profile/reviews")}>
          <ArrowBackIcon />
        </IconButton>
        Rate & Review
      </p>
      <div className="container">
        <p className="review-title">SELECT THE STARS TO RATE THE PRODUCT</p>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="container">
            <RateCard
              value={value}
              handleChange={handleChange}
              title={product?.title}
              image={product?.img?.[0]?.original}
            />
          </div>
          <p className="review-title">LEAVE A REVIEW</p>
          <hr />
          <div>
            <div className="row">
              <div className="col-md-6">
                <TextField
                  fullWidth
                  margin="normal"
                  name="title"
                  label="Review Title"
                  variant="outlined"
                  value={reviewInfo.title}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <TextField
                  fullWidth
                  margin="normal"
                  name="userName"
                  label="Your name"
                  variant="outlined"
                  value={reviewInfo.userName}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="col-md-12">
                <TextField
                  multiline
                  rows={8}
                  fullWidth
                  margin="normal"
                  name="description"
                  label="Detailed Review"
                  placeholder="Tell us more about your rating!"
                  variant="outlined"
                  value={reviewInfo.decription}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="col-md-12">
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    width: "100%",
                    fontSize: "1.1em",
                    backgroundColor: "skyblue",
                    "&:hover": {
                      backgroundColor: "#4a90e2",
                    },
                  }}
                >
                  SUBMIT REVIEW
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReviewProduct;
