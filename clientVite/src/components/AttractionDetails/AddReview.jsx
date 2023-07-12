import React, {
  Fragment,
  cloneElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import Joi from "joi";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAuthType,
  handleOpenAuthModal,
} from "../../rtk/features/authSlice";
import axios from "axios";
import { addReview } from "../../rtk/features/reviewSlice";
import Rating from "@mui/material/Rating";

const AddReview = () => {
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  const { auth, attractions, reviews } = useSelector((state) => state);
  const rating = reviews.Reviews ? reviews.Reviews.avgRating : 0;
  const reviewCount = reviews.Reviews ? reviews.Reviews.count : 0;

  const dispatch = useDispatch();

  const [form, setForm] = useState({
    description: "",
    rate: 0,
  });

  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (!open) {
      dispatch(handleAuthType("login"));
      dispatch(handleOpenAuthModal(false));
    }
  }, [open]);

  const schema = Joi.object({
    description: Joi.string().required(),
    rate: Joi.number().integer().required().min(1).max(5),
  });

  const handleChange = (e) => {
    setErrors({});
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const starClassNames = [];
  const makeStar = () => {
    const fullStars = Math.floor(form.rate);
    const hasHalfStar = form.rate - fullStars >= 0.5;
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
  };

  makeStar();
  useEffect(() => {
    makeStar();
  }, [form.rate]);

  const handleRate = (index) => {
    setForm({ ...form, rate: index + 1 });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = schema.validate(form);
    const { error } = err;
    if (error) {
      const errorData = {};
      for (let item of error.details) {
        let name = item.path[0];
        let message = item.message;
        errorData[name] = message;
      }
      setErrors(errorData);
    } else {
      setErrors({});
      AddNewReview();
    }
  };

  const AddNewReview = async () => {
    const newReview = {
      review: form.description,
      rating: form.rate,
      attraction: attractions.AttractionDetails._id,
      user: auth.userInfo._id,
    };
    console.log(newReview);
    await axios
      .post("http://localhost:9999/review", newReview)
      .then((response) => {
        console.log(response);
        const newRate =
          (rating * reviewCount + response.data.NewReview.rating) /
          (reviewCount + 1);
        dispatch(addReview({ avgRating: newRate, count: reviewCount + 1 }));
        setOpen(false);
      })
      .catch((error) => {
        const errorData = {};
        console.log(error.response);
        errorData.globalErr =
          "something went wrong ,please check your connection";
        setErrors(errorData);
      });
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className=" p-5 mt-32 items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="m-auto sm:my-8 sm:w-full sm:max-w-lg">
                <Dialog.Title>
                  <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-zinc-700 md:text-2xl dark:text-white">
                        Review
                      </h1>
                      <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                          <textarea
                            name="description"
                            id="description"
                            rows="3"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-[#be853f] focus:border-[#be853f] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Write your Review..."
                            onChange={(value) => handleChange(value)}
                          ></textarea>
                          <p className="text-red-500 text-xs italic">
                            {errors.description}
                          </p>
                        </div>
                        <div className="flex items-center mt-3 mb-3">
                          <p className="ml-2 mr-5 text-l font-medium text-zinc-600 dark:text-gray-400 ">
                            Your rating:
                          </p>
                          {starClassNames.map((className, index) => (
                            <svg
                              key={index}
                              onClick={() => handleRate(index)}
                              aria-hidden="true"
                              className={`w-5 h-5 cursor-pointer ${className}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          ))}
                          {/* <Rating
                            value={form.rate}
                            name="rate"
                            onChange={(value) => handleChange(value)}
                            precision={1}
                          /> */}
                        </div>
                        <p
                          className="text-red-500 text-xs italic"
                          style={{ marginTop: "0px" }}
                        >
                          {errors.rate}
                        </p>
                        <p className="text-red-500 text-xs italic">
                          {errors.globalErr}
                        </p>
                        <div>
                          <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-[#be853f] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={handleSubmit}
                          >
                            Add Review
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </Dialog.Title>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AddReview;

// import React, {
//   Fragment,
//   cloneElement,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import Joi from "joi";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   handleAuthType,
//   handleOpenAuthModal,
// } from "../../rtk/features/authSlice";
// import axios from "axios";

// const AddReview = () => {
//   const [open, setOpen] = useState(true);
//   const cancelButtonRef = useRef(null);
//   const { auth, attractions } = useSelector((state) => state);
//   const dispatch = useDispatch();

//   const [form, setForm] = useState({
//     description: "",
//     rate: 0,
//   });
//   const [errors, setErrors] = useState({});
//   useEffect(() => {
//     if (!open) {
//       dispatch(handleAuthType("login"));
//       dispatch(handleOpenAuthModal(false));
//     }
//   }, [open]);

//   const schema = Joi.object({
//     description: Joi.string().required(),
//     rate: Joi.number().integer().required().min(1).max(5),
//   });

//   const handleChange = (e) => {
//     setErrors({});
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const starClassNames = [];

//   const makeStar = () => {
//     const fullStars = Math.floor(form.rate);
//     const hasHalfStar = form.rate - fullStars >= 0.5;
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
//   };

//   makeStar();
//   useEffect(() => {
//     makeStar();
//   }, [form.rate]);

//   const handleRate = (index) => {
//     setForm({ ...form, rate: index + 1 });
//     console.log(index);
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const err = schema.validate(form);
//     const { error } = err;
//     if (error) {
//       const errorData = {};
//       for (let item of error.details) {
//         let name = item.path[0];
//         let message = item.message;
//         errorData[name] = message;
//       }
//       setErrors(errorData);
//     } else {
//       setErrors({});
//       AddNewReview();
//     }
//   };
//   const AddNewReview = async () => {
//     const newReview = {
//       review: form.description,
//       rating: form.rate,
//       attraction: attractions.AttractionDetails._id,
//       user: auth.userInfo._id,
//     };
//     console.log(newReview);
//     await axios
//       .post("http://localhost:9999/review", newReview)
//       .then((response) => {
//         setOpen(false);
//       })
//       .catch((error) => {
//         const errorData = {};
//         console.log(error.response);
//         errorData.globalErr =
//           "something went wrong ,please check your connection";
//         setErrors(errorData);
//       });
//   };
//   return (
//     <Transition.Root show={open} as={Fragment}>
//       <Dialog
//         as="div"
//         className="relative z-50"
//         initialFocus={cancelButtonRef}
//         onClose={setOpen}
//       >
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-200"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity" />
//         </Transition.Child>

//         <div className="fixed inset-0 z-10 overflow-y-auto">
//           <div className=" p-5 mt-32 items-center sm:p-0">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//               enterTo="opacity-100 translate-y-0 sm:scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//               leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//             >
//               <Dialog.Panel className="m-auto sm:my-8 sm:w-full sm:max-w-lg">
//                 <Dialog.Title>
//                   <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//                     <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//                       <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white">
//                         Review
//                       </h1>
//                       <form className="space-y-4 md:space-y-6" action="#">
//                         <div>
//                           <textarea
//                             name="description"
//                             id="description"
//                             rows="3"
//                             className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                             placeholder="Write your Review..."
//                             onChange={(value) => handleChange(value)}
//                           ></textarea>
//                           <p className="text-red-500 text-xs italic">
//                             {errors.description}
//                           </p>
//                         </div>
//                         <div className="flex items-center mt-3 mb-3">
//                           <p className="ml-2 mr-5 text-l font-medium text-gray-500 dark:text-gray-400 ">
//                             your rate :
//                           </p>
//                           {starClassNames.map((className, index) => (
//                             <svg
//                               key={index}
//                               onClick={() => handleRate(index)}
//                               aria-hidden="true"
//                               className={`w-5 h-5 cursor-pointer ${className}`}
//                               fill="currentColor"
//                               viewBox="0 0 20 20"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                             </svg>
//                           ))}
//                         </div>
//                         <p className="text-red-500 text-xs italic">
//                           {errors.rate}
//                         </p>
//                         <p className="text-red-500 text-xs italic">
//                           {errors.globalErr}
//                         </p>
//                         <div>
//                           <button
//                             type="submit"
//                             className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                             onClick={handleSubmit}
//                           >
//                             Add Review
//                           </button>
//                         </div>
//                       </form>
//                     </div>
//                   </div>
//                 </Dialog.Title>
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </div>
//       </Dialog>
//     </Transition.Root>
//   );
// };

// export default AddReview;
