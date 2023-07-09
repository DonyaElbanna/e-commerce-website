import { Container } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import wishlistStyle from "./WishListContanier.module.css";

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

  // const data = wishlistItems.map((item, idx) => {
  //   return (
  //     <div className="flex flex-row align-middle">
  //       <div
  //         className="card card-side bg-base-100 shadow-xl w-4/12 ml-64 mb-10"
  //         key={item._id}
  //       >
  //         <figure>
  //           <img className={wishlistStyle.cardImage} src={item.Images[0]} />
  //         </figure>
  //         <div className="card-body w-52 flex justify-between">
  //           <div>
  //             <h2 className="card-title">{item.name}</h2>
  //             <h2 className="card-title">
  //               <span>Available:</span>
  //               {item.status}
  //             </h2>
  //             <h2 className="card-title justify-between w-32">
  //               <span>Price:</span>
  //               <span>{item.AdultPrice}</span>
  //             </h2>
  //             <div className="flex mt-5">
  //               <span className="text-xs inline-flex items-center font-bold leading-sm uppercase px-5 py-1 bg-blue-200 text-blue-700 rounded-full w-min">
  //                 {/* {item.subcategory} */}
  //                 Cairo
  //               </span>
  //               <span className="text-xs inline-flex items-center font-bold leading-sm uppercase px-4 py-1 mx-3 bg-green-200 text-blue-700 rounded-full w-min">
  //                 {/* {item.category} */}
  //                 Cruse
  //               </span>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       <div className=" flex flex-col ml-5 items-center align-middle justify-evenly">
  //         <div className="flex flex-col justify-center">
  //           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex w-44">
  //             <svg
  //               xmlns="http://www.w3.org/2000/svg"
  //               fill="none"
  //               viewBox="0 0 24 24"
  //               strokeWidth="1.5"
  //               stroke="currentColor"
  //               className="w-6 h-6"
  //             >
  //               <path
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //                 d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
  //               />
  //             </svg>
  //             <p className="ml-3">Add To Cart</p>
  //           </button>
  //         </div>
  //         <div className="flex">
  //           <button onClick={() => handleRemoveFromWishlist(item)}>
  //             <svg
  //               xmlns="http://www.w3.org/2000/svg"
  //               viewBox="0 0 24 24"
  //               fill="red"
  //               className="w-6 h-6"
  //             >
  //               <path
  //                 fillRule="evenodd"
  //                 d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
  //                 clipRule="evenodd"
  //               />
  //             </svg>
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // });

  //Buttons inside the card

  // const data = wishlistItems.map((item) => {
  //   return (
  //     <div
  //       className="card card-side bg-base-100 shadow-xl w-4/12 mx-28 mb-10"
  //       key={item._id}
  //     >
  //       <figure>
  //         <img className={wishlistStyle.cardImage} src={item.Images[0]} />
  //       </figure>
  //       <div className="card-body w-52 flex justify-between">
  //         <div>
  //           <h2 className="card-title text-slate-50">{item.name}</h2>
  //           <h2 className="card-title">
  //             <span>Available:</span>
  //             <span className="text-slate-50">
  //               {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
  //             </span>
  //           </h2>
  //           <h2 className="card-title justify-between w-32">
  //             <span className="bold">Price:</span>
  //             <span className="text-slate-50">{item.AdultPrice}</span>
  //           </h2>
  //           <div className="flex mt-5">
  //             <span className="text-xs inline-flex items-center font-bold leading-sm uppercase px-5 py-1 bg-blue-200 text-blue-700 rounded-full w-min">
  //               {item.subcategory.type}
  //             </span>
  //             <span className="text-xs inline-flex items-center font-bold leading-sm uppercase px-4 py-1 mx-3 bg-green-200 text-blue-700 rounded-full w-min">
  //               {item.category.city}
  //             </span>
  //           </div>
  //         </div>
  //         <div className="flex flex-row-reverse text-center justify-start">
  //           <button onClick={() => handleRemoveFromWishlist(item)}>
  //             <svg
  //               xmlns="http://www.w3.org/2000/svg"
  //               viewBox="0 0 24 24"
  //               fill="red"
  //               className="w-6 h-6"
  //             >
  //               <path
  //                 fillRule="evenodd"
  //                 d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
  //                 clipRule="evenodd"
  //               />
  //             </svg>
  //           </button>
  //         </div>
  //         <div className="flex flex-row-reverse text-center justify-center">
  //           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex w-44">
  //             <svg
  //               xmlns="http://www.w3.org/2000/svg"
  //               fill="none"
  //               viewBox="0 0 24 24"
  //               strokeWidth="1.5"
  //               stroke="currentColor"
  //               className="w-6 h-6"
  //             >
  //               <path
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //                 d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
  //               />
  //             </svg>
  //             <p className="ml-3 w-32">Add To Cart</p>
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // });

  //Table

  const data = wishlistItems.map((item, idx) => {
    return (
      <div className="flex justify-evenly align-middle content-center bg-slate-500 rounded-full w-10/12 m-auto mb-12">
        <div className="text-xl text-black bold whitespace-nowrap">
          {idx + 1}
        </div>
        <img className={wishlistStyle.tableImage} src={item.Images[0]} />
        <div className="text-xl text-black bold whitespace-nowrap">
          {item.name}
        </div>
        <div className="text-xl text-black bold whitespace-nowrap">
          Alexandria
        </div>
        <div className="text-xl text-black bold whitespace-nowrap">Cruse</div>

        <div className="text-xl text-black bold whitespace-nowrap">
          ${item.AdultPrice}
        </div>
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex">
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
            <p className="whitespace-nowrap">Add To Cart</p>
          </button>
        </div>
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
    );
  });

  return (
    <div>
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
      {/* <div className="flex flex-wrap">{data}</div> */}
      {data}
    </div>
  );
};

export default WishListContanier;
