import { Container } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";

const baseURL = "http://localhost:9999/user/64931b6199ee6e4ef036a40f";

const WishListContanier = ({ attraction }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  useEffect(() => {
    const getWishlistItems = async () => {
      const { data } = await axios.get(baseURL);
      setWishlistItems(data.wishlist);
    };
    getWishlistItems();
  }, []);

  console.log(wishlistItems);

  return (
    <>
      <Container>wishlist</Container>
    </>
  );
};

export default WishListContanier;
