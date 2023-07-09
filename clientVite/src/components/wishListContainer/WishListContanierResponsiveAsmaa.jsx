import { Container } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import wishlistStyle from "./WishListContanier.module.css";
import { Link } from "react-router-dom";

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
  // console.log(wishlistItems);

  const handleRemoveFromWishlist = async (event, item) => {
    event.preventDefault(); ////
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
  const ddd = (event) => {
    event.preventDefault();
  };

  return (
    <div className="container px-5 mx-auto mb-5">
      <h3 className="text-4xl mb-10 text-center	">Cities</h3>
      {wishlistItems.length == 0 ? (
        <img
          src="https://www.egypttoursportal.com/images/2022/08/5-Days-Cairo-Aswan-Abu-Simbel-Tour-Package-Egypt-Tours-Portal.jpg"
          className="mx-auto"
          style={{ width: "150px" }}
        />
      ) : (
        <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
          {wishlistItems.map((cat) => (
            <div className="p-10" key={cat._id}>
              <div className=" w-full lg:max-w-full lg:flex">
                <div
                  className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                  style={{
                    backgroundImage:
                      "url('https://www.rjtravelagency.com/wp-content/uploads/2022/08/Tours-in-Egypt-2.jpg')",
                  }}
                  title="Mountain"
                ></div>
                <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                  <div className="mb-8">
                    <p className="text-sm text-gray-600 flex items-center">
                      <svg
                        className="fill-current text-gray-500 w-3 h-3 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                      </svg>
                      Members only
                    </p>
                    <div className="text-gray-900 font-bold text-xl mb-2">
                      Best Mountain Trails 2020
                    </div>
                    <p className="text-gray-700 text-base">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Voluptatibus quia, Nonea! Maiores et perferendis eaque,
                      exercitationem praesentium nihil.
                    </p>
                  </div>
                  <div className="flex items-center gap-10">
                    <button
                      type="button"
                      className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
                    >
                      Yellow
                    </button>
                    <button
                      type="button"
                      className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
                    >
                      Yellow
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishListContanier;
