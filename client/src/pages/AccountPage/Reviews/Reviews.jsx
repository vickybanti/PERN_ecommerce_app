/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { publicRequest, userRequest } from "../../../axiosRequest";
import { ReviewCard } from "../../../components/Cards/ProductCard/ProductCard";
import RateReviewIcon from "@mui/icons-material/RateReview";
import "../account.css";

const ReviewSkeleton = () => {
  return (
    <>
      <div className="d-flex justify-content-between  flex-lg-row flex-sm-column w-100">
        <div className="p-3">
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={150}
            height={100}
          />
        </div>
        <div className="p-3">
          <Skeleton animation="wave" height={40} width={410} />
          <Skeleton animation="wave" height={20} width={310} />
          <Skeleton animation="wave" height={20} width={200} />
        </div>
        <div className="p-3">
          <Skeleton animation="wave" width={120} height={60} />
        </div>
      </div>
    </>
  );
};

const NoReview = () => {
  return (
    <div
      className="d-flex justify-content-center pt-5"
      style={{ textAlign: "center" }}
    >
      <div className="py-4">
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
          <RateReviewIcon
            sx={{
              fontSize: "6em",
              color: "skyblue",
            }}
          />
        </div>
        <p className="card-title pt-3 pb-2">
          You currently have no pending order
        </p>
        <p className="card-text pb-4">
          All your pending orders will be displayed here
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
  );
};

function Reviews() {
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [productList, setProductList] = useState([]);
  const user = useSelector((state) => state.user.currentUser._id);

  const productIds = orders
    .flatMap((order) => order.products)
    .filter(
      (product, index, array) =>
        array.findIndex((p) => p.productId === product.productId) === index
    )
    .map((product) => product.productId);

  const idsNotInBoth = [
    ...productIds.filter((productId) => {
      return !reviews.some((review) => review.productId === productId);
    }),
    ...reviews
      .filter((review) => {
        return !productIds.includes(review.productId);
      })
      .map((review) => review.productId),
  ];

  const uniqueIdsNotInBoth = [...new Set(idsNotInBoth)];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await userRequest.get(`orders/find/${user}`);
        setOrders(res.data);
      } catch (error) {}
    };

    fetchOrders();
  }, [user]);

  useEffect(() => {
    const getProductDetails = async () => {
      const res = await userRequest.get(`reviews/find/user/${user}`);
      setReviews(res.data);
    };

    getProductDetails();
  }, []);

  useEffect(() => {
    const getProductDetails = async () => {
      const products = await Promise.all(
        uniqueIdsNotInBoth.map(async (productId) => {
          const response = await publicRequest.get(
            `products/find/${productId}`
          );
          return response.data;
        })
      );
      setProductList(products);
    };

    getProductDetails();
  }, [orders]);

  return (
    <div className="card main-card">
      <p className="card-header header">Pending Reviews</p>
      <div>
        <div className="review-list">
          <div className="container">
            {productList?.length === 0 && uniqueIdsNotInBoth.length === 0 ? (
              <NoReview />
            ) : productList?.length === 0 ? (
              <ReviewSkeleton />
            ) : (
              productList?.map((value, index) => {
                return (
                  <ReviewCard
                    key={index}
                    title={value?.title}
                    image={value?.img[0].original}
                    orderId={value?._id}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
