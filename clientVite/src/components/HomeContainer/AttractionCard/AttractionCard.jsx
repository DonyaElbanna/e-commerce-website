import React, { useState } from "react";
import Style from "./AttractionCard.module.css";
// return <div className={Style.fakh}></div>;
import { Link } from "react-router-dom";

const AttractionCard = ({ attr }) => {
  const [isFilled, setIsFilled] = useState(false);
  const fill = (event) => {
    event.preventDefault();
    setIsFilled(!isFilled);
  };

  return (
    <div className="flex justify-center flex-row">
      {/* <div>
        <img src="/bookmark.svg" className="mw-100" />
      </div> */}

      <Link
        to={`/city/${attr._id}/details`}
        className={`card w-96 bg-base-100 shadow-xl border-cyan-50 ${Style.enlarge} m-2`}
      >
        <figure className="img z-20">
          <img src={attr?.Images[0]} />
        </figure>
        <div className="card-body z-10">
          <div className={`btn btn-ghost btn-circle ${Style.svgIcon}`}>
            <svg
              onClick={fill}
              xmlns="http://www.w3.org/2000/svg"
              fill={isFilled ? "gold" : "none"}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="gold"
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
          <p>{attr?.description}</p>
          <div className="flex flex-left">
            <span className="mx-1 text-xs inline-flex items-center font-bold leading-sm uppercase px-4 py-1 bg-blue-200 text-blue-700 rounded-full w-min">
              {attr.subcategory.type}
            </span>
            <span className="text-xs inline-flex items-center font-bold leading-sm uppercase px-4 py-1 bg-blue-200 text-blue-700 rounded-full w-min">
              {attr.category.city}
            </span>
          </div>
          {/* <span className="text-lg text-gray-900 dark:text-white"></span> */}
          <div className="flex items-center justify-between">
            <div className="flex items-center mt-2.5 mb-5">
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
            </div>
            <span className="text-sm text-gray-500">
              {/* <span className="text-sm text-gray-400">from:</span> */}
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                {attr.AdultPrice}
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
