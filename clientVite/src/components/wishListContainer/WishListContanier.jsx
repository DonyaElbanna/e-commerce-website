import { Container } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import wishlistStyle from "./WishListContanier.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const baseURL = "http://localhost:9999/user/64a0892352ffbc8453b77147";

const WishListContanier = ({ attr }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  // const { auth } = useSelector((state) => state);
  // const baseURL = `http://localhost:9999/user/${auth.userInfo._id}`;

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
  console.log(wishlistItems[0]);
  return (
    <div className="container px-5 mx-auto mb-5">
      <div className="flex justify-center items-center mt-10 mb-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="brown"
          className="w-12 h-12 mb-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
        <h1 className="text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white mb-9">
          My
          <mark className="px-2 text-white bg-yellow-400 rounded dark:bg-blue-500">
            WishList
          </mark>
        </h1>
      </div>
      {/* <h3 className="text-4xl mb-10 text-center">Cities</h3> */}
      {wishlistItems.length == 0 ? (
        <img
          src="https://www.egypttoursportal.com/images/2022/08/5-Days-Cairo-Aswan-Abu-Simbel-Tour-Package-Egypt-Tours-Portal.jpg"
          className="mx-auto"
          style={{ width: "150px" }}
        />
      ) : (
        <div className="p-10 grid sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
          {wishlistItems.map((cat) => (
            <Link
              className="ml-5 mr-9 group w-11/12 h-fit"
              key={cat._id}
              to={`/city/${cat._id}/details`}
            >
              <div className="md:mr-8 group-hover:scale-105  md:w-80 lg:flex">
                {/* w-full */}
                <div
                  className="h-48 rounded-t-xl lg:rounded-r-none lg:rounded-l-xl lg:h-auto lg:w-48 flex-none bg-cover text-center overflow-hidden"
                  //  rounded-t  lg:rounded-l rounded-l-xl
                  style={{
                    backgroundImage: `url('${cat.Images[0]}')`,
                  }}
                ></div>
                <div className="border-l group-hover:bg-slate-200 rounded-b-xl lg:rounded-l-none lg:rounded-r-xl  2xl:h-64 border-xxl border-gray-400 sm:border-l lg:border-t border-r border-b lg:border-gray-400 bg-white p-4 flex flex-col justify-between leading-normal">
                  {/* rounded-b lg:rounded-b-none lg:rounded-r 2xl:rounded-r-xl */}
                  {/* sm:rounded-b-xl md:rounded-b-none */}
                  <div className="mb-8">
                    <div className="text-gray-900 font-bold text-xl mb-2">
                      {cat.name}
                    </div>
                    <h2 className="card-title justify-between w-32">
                      <span className="bold">Price:</span>
                      <span className=" bold text-gray-800">
                        ${cat.AdultPrice}
                      </span>
                      <span className=" text-xs  text-gray-600">/person</span>
                    </h2>
                    {/* <div className="text-gray-600 bold text-xl">
                      duration: {cat.duration}
                    </div> */}
                    <div className="flex justify-between mt-5">
                      <span className="text-xs inline-flex items-center font-bold leading-sm uppercase px-2 py-1 mx-3 bg-green-200 text-[#be853f] rounded-full w-min">
                        {cat.category.city}
                      </span>
                      <span className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-200 text-[#be853f] rounded-full w-min">
                        {cat.subcategory.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-evenly">
                    <div className="flex flex-row-reverse text-center justify-center">
                      <button
                        onClick={ddd}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex w-44"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                          />
                        </svg>
                        <p className="ml-3 w-32">Add To Cart</p>
                      </button>
                    </div>
                    <div className="flex flex-row-reverse text-center justify-start">
                      <button onClick={() => handleRemoveFromWishlist(item)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="red"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
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
