import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Joi from "joi";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  handleAuthType,
  handleIsLoggedIntoggle,
  handleOpenAuthModal,
  handleUserInfo,
} from "../../../rtk/features/authSlice";
// import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
const RegisterForm = () => {
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [accept, setAccept] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) {
      dispatch(handleAuthType("login"));
      dispatch(handleOpenAuthModal(false));
    }
  }, [open]);

  const schema = Joi.object({
    userName: Joi.string().required().min(3),
    email: Joi.string()
      .required()
      .pattern(/^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/),
    password: Joi.string().required().min(8),
    confirmPassword: Joi.string().required().min(8).equal(form.password),
  });

  const handleChange = (e) => {
    setErrors({});
    setForm({ ...form, [e.target.name]: e.target.value });
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
        if (message === `"${name}" is not allowed to be empty`)
          message = `${name} is required `;
        else if (name == "email") message = "Invalid email pattern";
        else if (name == "confirmPassword") message = "don't match password";
        errorData[name] = message;
      }
      setErrors(errorData);
    } else if (!accept) {
      const errorData = {};
      errorData.globalErr = "you have to accept terms and conditions";
      setErrors(errorData);
    } else {
      register();
      setErrors({});
    }
  };
  const register = async () => {
    const newUser = {
      email: form.email,
      username: form.userName,
      role: "user",
      password: form.password,
    };
    console.log(newUser);
    await axios
      .post("http://localhost:9999/user", newUser)
      .then((response) => {
        dispatch(handleUserInfo(response.data.user));
        dispatch(handleIsLoggedIntoggle());
        setOpen(false);
      })
      .catch((error) => {
        setOpen(true);
        const errorData = {};
        console.log(error.response);
        if (!error.response) {
          errorData.globalErr =
            "something went wrong ,please check your connection";
        } else if (
          error.response.data.message === "This email is already registered"
        ) {
          errorData.email = error.response.data.message;
        } else {
          errorData.userName =
            "this userName already exist , please try another one";
        }

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

        <div className="fixed inset-0 z-10 overflow-y-auto bg-black/50">
          <div className=" p-5 mt-5 items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="m-auto my-8 sm:w-full sm:max-w-lg">
                <Dialog.Title>
                  <div className="m-auto w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <h1 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-zinc-700">
                        Create New account
                      </h1>
                      <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                          <label
                            htmlFor="userName"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            User Name
                          </label>
                          <input
                            type="userName"
                            name="userName"
                            id="userName"
                            className="bg-gray-50 border border-gray-300 text-zinc-700  rounded-lg focus:ring-[#be853f] focus:border-[#be853f] block w-full p-2.5"
                            placeholder="John Elraqi"
                            required=""
                            onChange={(value) => handleChange(value)}
                          />
                          <p className="text-red-500 text-xs italic">
                            {errors.userName}
                          </p>
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Your email
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-zinc-700  rounded-lg focus:ring-[#be853f] focus:border-[#be853f] block w-full p-2.5"
                            placeholder="name@company.com"
                            required=""
                            onChange={(value) => handleChange(value)}
                          />
                          <p className="text-red-500 text-xs italic">
                            {errors.email}
                          </p>
                        </div>

                        <div>
                          <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-zinc-700  rounded-lg focus:ring-[#be853f] focus:border-[#be853f] block w-full p-2.5"
                            required=""
                            onChange={(value) => handleChange(value)}
                          />
                          <p className="text-red-500 text-xs italic">
                            {errors.password}
                          </p>
                        </div>
                        <div>
                          <label
                            htmlFor="confirmPassword"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Confirm password
                          </label>
                          <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-zinc-700  rounded-lg focus:ring-[#be853f] focus:border-[#be853f] block w-full p-2.5"
                            required=""
                            onChange={(value) => handleChange(value)}
                          />
                          <p className="text-red-500 text-xs italic">
                            {errors.confirmPassword}
                          </p>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="terms"
                              aria-describedby="terms"
                              type="checkbox"
                              onChange={() => setAccept(!accept)}
                              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-[#be853f] checked:bg-[#be853f]"
                              required=""
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="terms"
                              className="font-light text-gray-500 dark:text-gray-300"
                            >
                              I accept the{" "}
                              <a
                                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                href="#"
                              >
                                Terms and Conditions
                              </a>
                            </label>
                          </div>
                        </div>
                        <p className="text-red-500 text-xs italic">
                          {errors.globalErr}
                        </p>
                        <div>
                          <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-[#be853f] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={handleSubmit}
                          >
                            Sign up
                          </button>
                        </div>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                          Already have an account?{" "}
                          <Link
                            onClick={() => dispatch(handleAuthType("login"))}
                            className="font-semibold text-[#be853f] hover:text-yellow-700"
                          >
                            Login here
                          </Link>
                        </p>
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

export default RegisterForm;

// import React, { Fragment, useEffect, useRef, useState } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import Joi from "joi";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import {
//   handleAuthType,
//   handleIsLoggedIntoggle,
//   handleOpenAuthModal,
//   handleUserInfo,
// } from "../../../rtk/features/authSlice";
// // import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
// const RegisterForm = () => {
//   const [open, setOpen] = useState(true);
//   const cancelButtonRef = useRef(null);
//   const dispatch = useDispatch();
//   const [form, setForm] = useState({
//     userName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (!open) {
//       dispatch(handleAuthType("login"));
//       dispatch(handleOpenAuthModal(false));
//     }
//   }, [open]);

//   const schema = Joi.object({
//     userName: Joi.string().required().min(3),
//     email: Joi.string()
//       .required()
//       .pattern(/^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/),
//     password: Joi.string().required().min(8),
//     confirmPassword: Joi.string().required().min(8).equal(form.password),
//   });

//   const handleChange = (e) => {
//     setErrors({});
//     setForm({ ...form, [e.target.name]: e.target.value });
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
//         if (message === `"${name}" is not allowed to be empty`)
//           message = `${name} is required `;
//         else if (name == "email") message = "Invalid email pattern";
//         else if (name == "confirmPassword") message = "don't match password";
//         errorData[name] = message;
//       }
//       setErrors(errorData);
//     } else {
//       register();
//       setErrors({});
//     }
//   };
//   const register = async () => {
//     const newUser = {
//       email: form.email,
//       username: form.userName,
//       role: "user",
//       password: form.password,
//     };
//     console.log(newUser);
//     await axios
//       .post("http://localhost:9999/user", newUser)
//       .then((response) => {
//         dispatch(handleUserInfo(response.data.user));
//         dispatch(handleIsLoggedIntoggle());
//         setOpen(false);
//       })
//       .catch((error) => {
//         setOpen(true);
//         const errorData = {};
//         console.log(error.response);
//         if (!error.response) {
//           errorData.globalErr =
//             "something went wrong ,please check your connection";
//         } else if (
//           error.response.data.message === "This email is already registered"
//         ) {
//           errorData.email = error.response.data.message;
//         } else {
//           errorData.userName =
//             "this userName already exist , please try another one";
//         }

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
//           <div className=" p-5 mt-5 items-center sm:p-0">
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
//                         Create New account
//                       </h1>
//                       <form className="space-y-4 md:space-y-6" action="#">
//                         <div>
//                           <label
//                             htmlFor="userName"
//                             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                           >
//                             User Name
//                           </label>
//                           <input
//                             type="userName"
//                             name="userName"
//                             id="userName"
//                             className="bg-gray-50 border outline-indigo-300 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                             placeholder="John Elraqi"
//                             required=""
//                             onChange={(value) => handleChange(value)}
//                           />
//                           <p className="text-red-500 text-xs italic">
//                             {errors.userName}
//                           </p>
//                         </div>
//                         <div>
//                           <label
//                             htmlFor="email"
//                             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                           >
//                             Your email
//                           </label>
//                           <input
//                             type="email"
//                             name="email"
//                             id="email"
//                             className="bg-gray-50 border outline-indigo-300 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                             placeholder="name@company.com"
//                             required=""
//                             onChange={(value) => handleChange(value)}
//                           />
//                           <p className="text-red-500 text-xs italic">
//                             {errors.email}
//                           </p>
//                         </div>

//                         <div>
//                           <label
//                             htmlFor="password"
//                             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                           >
//                             Password
//                           </label>
//                           <input
//                             type="password"
//                             name="password"
//                             id="password"
//                             placeholder="••••••••"
//                             className="bg-gray-50 border outline-indigo-300 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                             required=""
//                             onChange={(value) => handleChange(value)}
//                           />
//                           <p className="text-red-500 text-xs italic">
//                             {errors.password}
//                           </p>
//                         </div>
//                         <div>
//                           <label
//                             htmlFor="confirmPassword"
//                             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                           >
//                             Confirm password
//                           </label>
//                           <input
//                             type="password"
//                             name="confirmPassword"
//                             id="confirmPassword"
//                             placeholder="••••••••"
//                             className="bg-gray-50 border outline-indigo-300 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                             required=""
//                             onChange={(value) => handleChange(value)}
//                           />
//                           <p className="text-red-500 text-xs italic">
//                             {errors.confirmPassword}
//                           </p>
//                         </div>
//                         <div className="flex items-start">
//                           <div className="flex items-center h-5">
//                             <input
//                               id="terms"
//                               aria-describedby="terms"
//                               type="checkbox"
//                               className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
//                               required=""
//                             />
//                           </div>
//                           <div className="ml-3 text-sm">
//                             <label
//                               htmlFor="terms"
//                               className="font-light text-gray-500 dark:text-gray-300"
//                             >
//                               I accept the{" "}
//                               <a
//                                 className="font-medium text-primary-600 hover:underline dark:text-primary-500"
//                                 href="#"
//                               >
//                                 Terms and Conditions
//                               </a>
//                             </label>
//                           </div>
//                         </div>
//                         <p className="text-red-500 text-xs italic">
//                           {errors.globalErr}
//                         </p>
//                         <div>
//                           <button
//                             type="submit"
//                             className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                             onClick={handleSubmit}
//                           >
//                             Sign up
//                           </button>
//                         </div>
//                         <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                           Already have an account?{" "}
//                           <Link
//                             onClick={() => dispatch(handleAuthType("login"))}
//                             className="font-semibold text-indigo-600 hover:text-indigo-500"
//                           >
//                             Login here
//                           </Link>
//                         </p>
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

// export default RegisterForm;
