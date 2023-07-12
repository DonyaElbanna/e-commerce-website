import React, { useState, useEffect } from "react";
import axios from "axios";
import Style from "./AttractionCard.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAuthType,
  handleToggleAuthModal,
} from "../../../rtk/features/authSlice";
import Rating from "@mui/material/Rating";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";

const AttractionCard = ({ attr }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  function calculateAverageRating(ratings) {
    var sum = 0;
    var count = 0;

    for (var i = 0; i < ratings.length; i++) {
      var rating = ratings[i];
      if (typeof rating.rating === "number") {
        sum += rating.rating;
        count++;
      }
    }
    var average = count > 0 ? sum / count : 0;
    return average;
  }

  const [isFilled, setIsFilled] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    if (auth.userInfo._id) {
      const getWishlistItems = async () => {
        const { data } = await axios.get(
          `http://localhost:9999/user/${auth.userInfo._id}`
        );
        // console.log(data.wishlist);
        setWishlistItems(data.wishlist);
      };
      getWishlistItems();
    }
  }, []);

  const handleAddToWishlist = async (event) => {
    event.preventDefault();

    if (wishlistItems.some((item) => item._id === attr._id)) {
      setIsFilled(false);
      const newWishlist = wishlistItems.filter((item) => item._id !== attr._id);
      setWishlistItems(newWishlist);
    } else {
      setIsFilled(true);
    }
    try {
      await axios.post(`http://localhost:9999/user/${auth.userInfo._id}`, {
        id: auth.userInfo._id,
        Attraction: attr._id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  function redirectToLogin(event) {
    event.preventDefault();
    dispatch(handleAuthType("login"));
    dispatch(handleToggleAuthModal());
  }

  const starClassNames = [];
  const rating =
    attr.reviews && attr.reviews.length > 0
      ? attr.reviews[0].avgRating
      : attr.averageRating
      ? attr.averageRating
      : 0;
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
  function handleAddRating(event) {
    event.preventDefault();
  }

  return (
    <div className="flex justify-center">
      <Link
        to={`/city/${attr._id}/details`}
        className={`card w-96 bg-gray-800 shadow-xl ${Style.enlarge} m-2 hover:bg-gray-900 cursor-pointer`}
      >
        <figure>
          <img src={attr?.Images[0]} className="h-52 rounded-t-xl w-full" />
        </figure>

        <div className=" z-10">
          <div className=" flex justify-end p-1">
            <button className="btn btn-ghost btn-circle">
              <svg
                onClick={isLoggedIn ? handleAddToWishlist : redirectToLogin}
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
                <p>{attr.category.city || attr.category[0].city}</p>
              </div>
              <div className="p-2 text-center text-xs leading-sm uppercase border border-gray-400 rounded-full text-[#be853f] ">
                <p>{attr.subcategory.type || attr.subcategory[0].type}</p>
              </div>
            </article>
            <article className="flex items-center justify-between my-5">
              {/* <div className="flex items-center">
                {starClassNames.map((className, index) => (
                  <svg
                    key={index}
                    onClick={isLoggedIn ? handleAddRating : redirectToLogin}
                    aria-hidden="true"
                    className={`w-5 h-5 ${className}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div> */}
              <Rating
                value={
                  attr.review && attr.review.length !== 0
                    ? calculateAverageRating(attr.review)
                    : 0
                }
                precision={0.25}
                readOnly
                emptyIcon={
                  <StarBorderOutlinedIcon
                    fontSize="inherit"
                    sx={{ color: "#6b7280" }}
                  />
                }
              />
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
  );
};

export default AttractionCard;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Style from "./AttractionCard.module.css";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   handleAuthType,
//   handleToggleAuthModal,
// } from "../../../rtk/features/authSlice";

// const AttractionCard = ({ attr }) => {
//   const { isLoggedIn } = useSelector((state) => state.auth);
//   const { auth } = useSelector((state) => state);

//   const dispatch = useDispatch();

//   const [isFilled, setIsFilled] = useState(false);
//   const [wishlistItems, setWishlistItems] = useState([]);

//   useEffect(() => {
//     if (auth.userInfo._id) {
//       const getWishlistItems = async () => {
//         const { data } = await axios.get(
//           `http://localhost:9999/user/${auth.userInfo._id}`
//         );
//         setWishlistItems(data.wishlist);
//       };
//       getWishlistItems();
//     }
//   }, []);

//   const handleAddToWishlist = async (event) => {
//     event.preventDefault();

//     if (wishlistItems.some((item) => item._id === attr._id)) {
//       setIsFilled(false);
//       const newWishlist = wishlistItems.filter((item) => item._id !== attr._id);
//       setWishlistItems(newWishlist);
//     } else {
//       setIsFilled(true);
//     }
//     try {
//       await axios.post(`http://localhost:9999/user/${auth.userInfo._id}`, {
//         id: auth.userInfo._id,
//         Attraction: attr._id,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   function redirectToLogin(event) {
//     event.preventDefault();
//     dispatch(handleAuthType("login"));
//     dispatch(handleToggleAuthModal());
//   }

//   const starClassNames = [];
//   const rating =
//     attr.reviews && attr.reviews.length > 0
//       ? attr.reviews[0].avgRating
//       : attr.averageRating
//       ? attr.averageRating
//       : 0;
//   (function () {
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating - fullStars >= 0.5;
//     for (let i = 0; i < fullStars; i++) {
//       starClassNames.push("text-yellow-400");
//     }
//     if (hasHalfStar) {
//       starClassNames.push("text-yellow-400");
//     }
//     const emptyStars = 5 - starClassNames.length;
//     for (let i = 0; i < emptyStars; i++) {
//       starClassNames.push("text-gray-300 dark:text-gray-500");
//     }
//   })();
//   function handleAddRating(event) {
//     event.preventDefault();
//   }
//   return (
//     <div className="flex justify-center flex-row">
//       <Link
//         to={`/city/${attr._id}/details`}
//         className={`card w-96 bg-gray-700 shadow-xl border-cyan-50 ${Style.enlarge} m-2 hover:bg-base-100 cursor-pointer`}
//       >
//         <img src={attr?.Images[0]} className="h-52 rounded-t-xl" />
//         <div className="card-body z-10">
//           <div className={`btn btn-ghost btn-circle top-56 ${Style.svgIcon}`}>
//             <svg
//               onClick={isLoggedIn ? handleAddToWishlist : redirectToLogin}
//               xmlns="http://www.w3.org/2000/svg"
//               fill={
//                 wishlistItems.some((item) => item._id === attr._id) || isFilled
//                   ? "#FF0000"
//                   : "none"
//               }
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="#DC143C"
//               className="w-6 h-auto"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
//               />
//             </svg>
//           </div>
//           <h2 className="card-title">{attr?.name}</h2>
//           <div className="flex justify-between">
//             <span className="text-xs inline-flex items-center font-bold leading-sm uppercase px-4 py-1 bg-green-200 text-[#be853f] rounded-full w-min">
//               {attr.category.city || attr.category[0].city}
//             </span>
//             <span className="mx-1 text-xs inline-flex items-center font-bold leading-sm uppercase px-4 py-1 bg-blue-200 text-[#be853f] rounded-full w-min">
//               {attr.subcategory.type || attr.subcategory[0].type}
//             </span>
//           </div>
//           <span className="text-lg text-gray-900 dark:text-white"></span>
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               {starClassNames.map((className, index) => (
//                 <svg
//                   key={index}
//                   onClick={isLoggedIn ? handleAddRating : redirectToLogin}
//                   aria-hidden="true"
//                   className={`w-5 h-5 ${className}`}
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                 </svg>
//               ))}
//             </div>

//             <span className="text-sm text-gray-500">
//               <span className="text-3xl font-bold text-gray-200 dark:text-white">
//                 ${attr.AdultPrice}
//               </span>
//               /person
//             </span>
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default AttractionCard;

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
