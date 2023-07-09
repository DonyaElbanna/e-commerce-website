import { Container } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import wishlistStyle from "./WishListContanier.module.css";
import AttractionCard from "../HomeContainer/AttractionCard/AttractionCard";

const baseURL = "http://localhost:9999/user/64a8519bd3da2479266c9eba";

const WishListContanier = ({ attr }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  useEffect(() => {
    const getWishlistItems = async () => {
      const { data } = await axios.get(baseURL);
      setWishlistItems(data.wishlist);
    };
    getWishlistItems();
  }, []);
  console.log(wishlistItems);

  const handleRemoveFromWishlist = async (item) => {
    const updatedWishlist = wishlistItems.filter(
      (wishlistItem) => wishlistItem._id !== item._id
    );
    setWishlistItems(updatedWishlist);
    try {
      await axios.post(baseURL, { id: item._id });
    } catch (err) {
      console.log(err);
    }
  };

  const data = wishlistItems.map((item, idx) => {
    // return <AttractionCard key={attr._id} attr={attr} />;
    return <AttractionCard />;
  });

  return (
    <div>
      <div className="flex flex-wrap">{data}</div>
    </div>
  );
};

export default WishListContanier;
