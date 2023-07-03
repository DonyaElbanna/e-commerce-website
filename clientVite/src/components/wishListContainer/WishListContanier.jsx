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

  // const data = wishlistItems.map((item, idx) => {
  //   return (
  //     <tr>
  //       <td className="whitespace-nowrap px-6 py-4 font-medium">{idx + 1}</td>
  //       <td className="whitespace-nowrap px-6 py-4">{item.name}</td>
  //       <td className="whitespace-nowrap px-6 py-4">{item.category}</td>
  //       <td className="whitespace-nowrap px-6 py-4">{item.subcategory}</td>
  //       <td className="whitespace-nowrap px-6 py-4">{item.AdultPrice}</td>
  //       {/* <td className="whitespace-nowrap px-6 py-4">
  //         <button
  //           type="button"
  //           class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
  //         >
  //           Edit
  //         </button>
  //       </td>
  //       <td className="whitespace-nowrap px-6 py-4">
  //         <button
  //           type="button"
  //           class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
  //         >
  //           Delete
  //         </button>
  //       </td> */}
  //     </tr>
  //   );
  // });

  // return (
  //   <>
  //     <div className=" w-3/4">
  //       <div className="flex flex-col bg-gray-700">
  //         <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
  //           <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
  //             <div className="overflow-hidden">
  //               <table className="min-w-full text-left text-sm font-light bg-gray-700">
  //                 <thead className="border-b font-medium border-gray-500">
  //                   <tr>
  //                     <th scope="col" className="px-6 py-4">
  //                       #
  //                     </th>
  //                     <th scope="col" className="px-6 py-4">
  //                       Name
  //                     </th>
  //                     <th scope="col" className="px-6 py-4">
  //                       City
  //                     </th>
  //                     <th scope="col" className="px-6 py-4">
  //                       Type
  //                     </th>
  //                     <th scope="col" className="px-6 py-4">
  //                       Price
  //                     </th>
  //                     <th scope="col" className="px-6 py-4">
  //                       Edit
  //                     </th>
  //                     <th scope="col" className="px-6 py-4">
  //                       Delete
  //                     </th>
  //                   </tr>
  //                 </thead>
  //                 <tbody>{data}</tbody>
  //               </table>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //     {/* <Container>wishlist</Container> */}
  //   </>
  // );

  const data = wishlistItems.map((item, idx) => {
    return (
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center">
        <td className="whitespace-nowrap px-6 py-4 font-medium text-center">
          {idx + 1}
        </td>
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-left"
        >
          {item.name}
        </th>
        <td className="px-6 py-4 text-center">{item.category}</td>
        <td className="px-6 py-4 text-center">{item.subcategory}</td>
        <td className="px-6 py-4 text-center">${item.AdultPrice}</td>
        <td className="px-6 py-4  text-centert">
          <div className="flex flex-row justify-center">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              <p className="ml-3">Add To Cart</p>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 text-center">
          <a
            href="#"
            className="font-medium hover:underline flex justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="red"
              className="w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                clip-rule="evenodd"
              />
            </svg>
            {/* <p>Delete</p> */}
          </a>
        </td>
      </tr>
    );
  });
  return (
    <div>
      {/* <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        your
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-emerald-600 ">
          WishList
        </span>
      </h1> */}

      <div className="flex justify-center items-center mt-10 mb-10">
        <h1 className="text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white mb-9">
          your
          <mark className="px-2 text-white bg-yellow-400 rounded dark:bg-blue-500">
            WishList
          </mark>
        </h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="brown"
          className="w-12 h-12 mb-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
      </div>

      <div className="content-center flex justify-center items-center">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-10/12">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-4 text-center">
                  #
                </th>
                <th scope="col" className="px-6 py-4 text-center">
                  Name
                </th>
                <th scope="col" className="px-6 py-4 text-center">
                  City
                </th>
                <th scope="col" className="px-6 py-4 text-center">
                  Type
                </th>
                <th scope="col" className="px-6 py-4 text-center">
                  Price
                </th>
                <th scope="col" className="px-6 py-4 text-center">
                  Add To Cart
                </th>
                <th scope="col" className="px-6 py-4 text-center">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>{data}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WishListContanier;
