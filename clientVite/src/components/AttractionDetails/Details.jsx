import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAuthType,
  handleToggleAuthModal,
} from "../../rtk/features/authSlice";
import Rating from "@mui/material/Rating";

const Details = ({ attrDetails }) => {
  const { auth, reviews } = useSelector((state) => state);

  const dispatch = useDispatch();
  const rating = reviews.Reviews ? reviews.Reviews.avgRating : 0;
  const reviewCount = reviews.Reviews ? reviews.Reviews.count : 0;

  const starClassNames = [];
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
      starClassNames.push("text-zinc-400 dark:text-gray-500");
    }
  })();

  function handleAddRating(event) {
    event.preventDefault();
    dispatch(handleAuthType("review"));
    dispatch(handleToggleAuthModal());
  }

  function redirectToLogin(event) {
    dispatch(handleAuthType("login"));
    dispatch(handleToggleAuthModal());
  }

  return (
    <>
      <div className="md:w-2/3 ">
        <p className="font-bold text-zinc-700 text-lg">Top Rate</p>
        <div className="flex items-center mt-3 mb-3 text-zinc-500">
          {starClassNames.map((className, index) => (
            <button
              key={index}
              onClick={auth.userInfo.email ? handleAddRating : redirectToLogin}
              className="text-zinc-500"
            >
              <svg
                aria-hidden="true"
                className={`w-5 h-5 ${className}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </button>
          ))}
          {/* <Rating
              value={
                attrDetails.reviews.length !== 0
                  ? attrDetails.reviews[0].avgRating
                  : 0
              }
              onClick={auth.userInfo.email ? handleAddRating : redirectToLogin}
              precision={0.25}
            /> */}
          <p className="text-zinc-700 ml-5">{Number(rating).toFixed(2)}</p>
          <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
          <p className="text-zinc-700">{reviewCount} reviews</p>
        </div>
        <div>
          <p>
            <span className="font-sans text-#004794 font-bold text-2xl text-blue-700">
              {attrDetails.name}
              <span className="text-yellow-500">
                {" "}
                Start from ${attrDetails.AdultPrice}
              </span>
            </span>
          </p>
          <p className="mt-5 text-zinc-700">{attrDetails.description}</p>

          <p className="text-yellow-500 font-bold text-2xl mt-5">
            Tour Details:
          </p>
          <ul className="list-disc p-5 mx-3 text-zinc-700">
            <li>Duration: About {attrDetails.duration}</li>
            <li>Type: Private Tours</li>
            <li>Run: Everyday</li>
            <li>Pick-up Time: From 07:30 to 08:00 am</li>
          </ul>
          <p className="text-yellow-500 font-bold text-2xl mt-5">
            What's Include:
          </p>
          <ul className="list-disc p-5 mx-3 text-zinc-700">
            {attrDetails.included.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p className="text-yellow-500 font-bold text-2xl mt-5">
            What's Excluded:
          </p>
          <ul className="list-disc p-5 mx-3 text-zinc-700">
            {attrDetails.excluded.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Details;

// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   handleAuthType,
//   handleToggleAuthModal,
// } from "../../rtk/features/authSlice";

// const Details = ({ attrDetails }) => {
//   const { auth } = useSelector((state) => state);
//   const dispatch = useDispatch();
//   const rating =
//     attrDetails.reviews && attrDetails.reviews.length > 0
//       ? attrDetails.reviews[0].avgRating
//       : 0;
//   const reviewCount =
//     attrDetails.reviews && attrDetails.reviews.length > 0
//       ? attrDetails.reviews[0].count
//       : 0;
//   const starClassNames = [];
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
//     dispatch(handleAuthType("review"));
//     dispatch(handleToggleAuthModal());
//   }
//   function redirectToLogin(event) {
//     dispatch(handleAuthType("login"));
//     dispatch(handleToggleAuthModal());
//   }
//   return (
//     <>
//       <div className="md:w-2/3 ">
//         <p className="font-bold">Top Rate</p>
//         <div className="flex items-center mt-3 mb-3">
//           {starClassNames.map((className, index) => (
//             <button
//               key={index}
//               onClick={auth.userInfo.email ? handleAddRating : redirectToLogin}
//             >
//               <svg
//                 aria-hidden="true"
//                 className={`w-5 h-5 ${className}`}
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//               </svg>
//             </button>
//           ))}
//           <p className="text-gray-600 ml-5">{Number(rating).toFixed(2)}</p>
//           <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
//           <p className="text-gray-600">{reviewCount} reviews</p>
//         </div>
//         <div>
//           <p>
//             <span className="font-sans text-#004794 font-bold text-2xl text-blue-700">
//               {attrDetails.name}
//               <span className="text-yellow-500">
//                 {" "}
//                 Start from ${attrDetails.AdultPrice}
//               </span>
//             </span>
//           </p>
//           <p className="mt-5">{attrDetails.description}</p>

//           <p className="text-yellow-500 font-bold text-2xl mt-5">
//             Tour Details:
//           </p>
//           <ul className="list-disc p-5 mx-3">
//             <li>Duration: About {attrDetails.duration}</li>
//             <li>Type: Private Tours</li>
//             <li>Run: Everyday</li>
//             <li>Pick-up Time: From 07:30 to 08:00 am</li>
//           </ul>
//           <p className="text-yellow-500 font-bold text-2xl mt-5">
//             What's Include:
//           </p>
//           <ul className="list-disc p-5 mx-3">
//             {attrDetails.included.map((item, i) => (
//               <li key={i}>{item}</li>
//             ))}
//           </ul>
//           <p className="text-yellow-500 font-bold text-2xl mt-5">
//             What's Excluded:
//           </p>
//           <ul className="list-disc p-5 mx-3">
//             {attrDetails.excluded.map((item, i) => (
//               <li key={i}>{item}</li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Details;
