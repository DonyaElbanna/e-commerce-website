import React, { useState, useEffect } from "react";
import axios from "axios";
import Style from "./AttractionCard.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import WishlistContainer from "../../wishListContainer/WishListContanier";

const baseURL = "http://localhost:9999/user/64931b6199ee6e4ef036a40f";

const AttractionCard = ({ attr }) => {
  const navigate = useNavigate();
// console.log()
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isLoggedIn = true;

  const [isFilled, setIsFilled] = useState(false);

  const [wishlistItems, setWishlistItems] = useState([]);

  // const [isWishlistItem, setIsWishlistItem] = useState(false);

  useEffect(() => {
    // getting attractions in wishlist
    const getWishlistItems = async () => {
      const { data } = await axios.get(baseURL);
      setWishlistItems(data.wishlist);
    };
    getWishlistItems();
    // checkWishlist();
  }, [wishlistItems]);

  // const checkWishlist = async () => {
  //   try {
  //     const response = await axios.get(baseURL);
  //     const wishlistItems = response.data.wishlist;
  //     const isInWishlist = wishlistItems.some((item) => item._id === attr._id);
  //     setIsWishlistItem(isInWishlist);
  //     console.log(wishlistItems);
  //   } catch (error) {
  //     console.error("Error checking wishlist:", error);
  //   }
  // };

  const handleAddToWishlist = async (event) => {
    event.preventDefault();
    // console.log(attr._id);
    // console.log(wishlistItems.includes(attr._id));
    await axios.post(baseURL, { id: attr._id });
    // console.log(wishlistItems);
    setIsFilled(!isFilled);

    // try {
    //   if (isWishlistItem) {
    //     await axios.delete(baseURL, { data: { _id: attr._id } });
    //   } else {
    //   }
    // } catch (error) {
    //   console.error("Error toggling wishlist item:", error);
    // }
  };

  function redirect(event) {
    event.preventDefault();
    navigate("/login");
  }

  const starClassNames = [];
  const rating = attr.reviews.length > 0 ? attr.reviews[0].avgRating : 0;
  (function () {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    for (let i = 0; i < fullStars; i++) {
      starClassNames.push("text-yellow-400");
    }
    if (hasHalfStar) {
      starClassNames.push("text-yellow-400");
    }
    const emptyStars = 5 - starClassNames.length;
    for (let i = 0; i < emptyStars; i++) {
      starClassNames.push("text-gray-300 dark:text-gray-500");
    }
  })();

  return (
    <div className="flex justify-center flex-row">
      <Link
        to={`/city/${attr._id}/details`}
        className={`card w-96 bg-base-100 shadow-xl border-cyan-50 ${Style.enlarge} m-2`}
      >
        {/* <figure className="img z-20"> */}
        <img src={attr?.Images[0]} className="h-52 rounded-t-xl" />
        {/* </figure> */}
        <div className="card-body z-10">
          <div className={`btn btn-ghost btn-circle top-56 ${Style.svgIcon}`}>
            <svg
              onClick={isLoggedIn ? handleAddToWishlist : redirect}
              xmlns="http://www.w3.org/2000/svg"
              // fill={isFilled ? "#FF0000" : "none"}
              fill={wishlistItems.includes(attr._id) ? "#FF0000" : "none"}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#DC143C"
              className="w-6 h-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </div>
          <h2 className="card-title">{attr?.name}</h2>
          {/* <p>{attr?.description}</p> */}
          <div className="flex">
            <span className="mx-1 text-xs inline-flex items-center font-bold leading-sm uppercase px-4 py-1 bg-blue-200 text-blue-700 rounded-full w-min">
            {attr.subcategory[0].type}
            </span>
            <span className="text-xs inline-flex items-center font-bold leading-sm uppercase px-4 py-1 bg-blue-200 text-blue-700 rounded-full w-min">
              {attr.category[0].city}
            </span>
          </div>
          <span className="text-lg text-gray-900 dark:text-white"></span>
          <div className="flex items-center justify-between">
            {/* <div className="flex items-center mt-2.5 mb-5">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>First star</title>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Second star</title>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Third star</title>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Fourth star</title>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Fifth star</title>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                5.0
              </span>
            </div> */}

            <div className="flex items-center">
              {starClassNames.map((className, index) => (
                <svg
                  key={index}
                  aria-hidden="true"
                  className={`w-5 h-5 ${className}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
            </div>

            <span className="text-sm text-gray-500">
              {/* <span className=" text-lg text-gray-400">from:</span> */}
              <span className="text-3xl font-bold text-gray-200 dark:text-white">
                $159
              </span>
              /person
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AttractionCard;

//  <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-min">
//    <a>
//      <img
//        className="p-8 rounded-t-lg"
//        src="https://ican-travel.net/wp-content/uploads/2019/08/وادى_الريان_الفيوم.jpg"
//        alt="product image"
//      />
//    </a>
//    <div className="px-5 pb-5">
//      <a>
//        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
//          Fayoum Oasis
//        </h5>
//      </a>
//      <div className="flex items-center mt-2.5 mb-5">
//        <svg
//          aria-hidden="true"
//          className="w-5 h-5 text-yellow-300"
//          fill="currentColor"
//          viewBox="0 0 20 20"
//          xmlns="http://www.w3.org/2000/svg"
//        >
//          <title>First star</title>
//          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//        </svg>
//        <svg
//          aria-hidden="true"
//          className="w-5 h-5 text-yellow-300"
//          fill="currentColor"
//          viewBox="0 0 20 20"
//          xmlns="http://www.w3.org/2000/svg"
//        >
//          <title>Second star</title>
//          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//        </svg>
//        <svg
//          aria-hidden="true"
//          className="w-5 h-5 text-yellow-300"
//          fill="currentColor"
//          viewBox="0 0 20 20"
//          xmlns="http://www.w3.org/2000/svg"
//        >
//          <title>Third star</title>
//          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//        </svg>
//        <svg
//          aria-hidden="true"
//          className="w-5 h-5 text-yellow-300"
//          fill="currentColor"
//          viewBox="0 0 20 20"
//          xmlns="http://www.w3.org/2000/svg"
//        >
//          <title>Fourth star</title>
//          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//        </svg>
//        <svg
//          aria-hidden="true"
//          className="w-5 h-5 text-yellow-300"
//          fill="currentColor"
//          viewBox="0 0 20 20"
//          xmlns="http://www.w3.org/2000/svg"
//        >
//          <title>Fifth star</title>
//          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//        </svg>
//        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
//          5.0
//        </span>
//      </div>
//      <div className="flex items-center justify-between">
//        <span className="text-3xl font-bold text-gray-900 dark:text-white">
//          $599
//        </span>
//        <button className="btn btn-primary">Add</button>
//      </div>
//    </div>
//  </div>;
