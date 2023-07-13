import { Container } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import wishlistStyle from "./WishListContanier.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import gif from "../../assets/gih.gif";
import Style from "../HomeContainer/AttractionCard/AttractionCard.module.css";
import AttractionCard from "../HomeContainer/AttractionCard/AttractionCard";

const WishListContanier = ({ attr }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  const { auth, cities, categories } = useSelector((state) => state);
  const baseURL = `http://localhost:9999/user/${auth.userInfo._id}`;

  useEffect(() => {
    const getWishlistItems = async () => {
      const { data } = await axios.get(baseURL);
      // console.log(data.wishlist);
      setWishlistItems(data.wishlist);
    };
    getWishlistItems();
  }, []);

  const handleRemoveFromWishlist = async (event, item) => {
    event.preventDefault();
    const updatedWishlist = wishlistItems.filter(
      (wishlistItem) => wishlistItem._id !== item._id
    );
    setWishlistItems(updatedWishlist);
    try {
      await axios.post(baseURL, {
        id: auth.userInfo._id,
        Attraction: item._id,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const ddd = (event) => {
    event.preventDefault();
  };
  return (
    <div className="container px-5 mx-auto mb-5">
      <div className="flex justify-center items-center my-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="brown"
          className="w-8 md:w-10 lg:w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
        <h1 className="text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          My{" "}
          <mark className="px-2 text-white bg-yellow-400 rounded dark:bg-blue-500">
            WishList
          </mark>
        </h1>
      </div>
      {wishlistItems.length == 0 ? (
        // <img
        //   src="https://www.egypttoursportal.com/images/2022/08/5-Days-Cairo-Aswan-Abu-Simbel-Tour-Package-Egypt-Tours-Portal.jpg"
        //   className="mx-auto"
        //   style={{ width: "150px" }}
        // />
        <img
          src={gif}
          className="mx-auto"
          style={{ width: "150px", marginTop: "120px" }}
        />
      ) : (
        // lg:mx-10
        <div className="py-6 mx-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          {wishlistItems.map((attr) => (
            <div className="flex justify-center" key={attr._id}>
              <Link
                to={`/city/${attr._id}/details`}
                className={`card w-80 mt-10 bg-gray-800 shadow-xl ${Style.enlarge} m-2 hover:bg-gray-900 cursor-pointer`}
              >
                <figure>
                  <img
                    src={attr?.Images[0]}
                    className="h-52 rounded-t-xl w-full"
                  />
                </figure>

                <div className=" z-10">
                  <div className=" flex justify-end p-1">
                    <button className="btn btn-ghost btn-circle">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                        />
                      </svg>
                    </button>
                    <button className="btn btn-ghost btn-circle">
                      <svg
                        onClick={(e) => handleRemoveFromWishlist(e, attr)}
                        xmlns="http://www.w3.org/2000/svg"
                        fill={
                          wishlistItems.some((item) => item._id === attr._id) ||
                          isFilled
                            ? "#FF0000"
                            : "none"
                        }
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#DC143C"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                    </button>
                  </div>
                  <figcaption className="px-4 pb-4 ">
                    <h2 className="card-title mb-5 text-white">{attr?.name}</h2>
                    <article className="flex justify-between items-center">
                      <div className="text-[#be853f] font-bold text-lg">
                        <p>
                          {
                            cities.cities.find(
                              (city) => city._id === attr.category
                            ).city
                          }
                        </p>
                      </div>
                      <div className="p-2 text-center text-xs leading-sm uppercase border border-gray-400 rounded-full text-[#be853f] ">
                        <p>
                          {
                            categories.categories.find(
                              (category) => category._id === attr.subcategory
                            ).type
                          }
                        </p>
                      </div>
                    </article>
                    <article className="flex items-center justify-between my-5">
                      <span className="text-sm text-gray-500">
                        <span className="text-2xl font-bold text-gray-200 dark:text-white">
                          ${attr.AdultPrice}
                        </span>
                        /person
                      </span>
                    </article>
                  </figcaption>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishListContanier;
/* <p className="text-sm text-gray-600 flex items-center">
    <svg
      className="fill-current text-gray-500 w-3 h-3 mr-2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
    </svg>
    Members only
  </p> */
