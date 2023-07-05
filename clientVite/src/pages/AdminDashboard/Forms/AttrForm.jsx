import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Joi from "joi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAuthType,
  handleOpenAuthModal,
} from "../../../rtk/features/authSlice";

const AttrForm = () => {
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  const { auth } = useSelector((state) => state);
  // console.log(auth.editedUser);

  const dispatch = useDispatch();
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
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
    } else {
      register();
      setErrors({});
    }
  };
  const register = async () => {
    const newUser = {
      email: form.email,
      username: form.userName,
      password: form.password,
    };
    console.log(newUser);
    if (!auth.editedUser) {
      await axios
        .post("http://localhost:9999/user", newUser)
        .then((response) => {
          // dispatch(handleUserInfo(response.data.user));
          // dispatch(handleIsLoggedIntoggle());
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
    } else {
      await axios
        .put(`http://localhost:9999/user/${auth.editedUser._id}`, newUser)
        .then((response) => {
          // dispatch(handleUserInfo(response.data.user));
          // dispatch(handleIsLoggedIntoggle());
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
    }
  };

  return (
    // <Transition.Root show={open} as={Fragment}>
    //   <Dialog
    //     as="div"
    //     className="relative z-50"
    //     initialFocus={cancelButtonRef}
    //     onClose={setOpen}
    //   >
    //     <Transition.Child
    //       as={Fragment}
    //       enter="ease-out duration-300"
    //       enterFrom="opacity-0"
    //       enterTo="opacity-100"
    //       leave="ease-in duration-200"
    //       leaveFrom="opacity-100"
    //       leaveTo="opacity-0"
    //     >
    //       <div className="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity" />
    //     </Transition.Child>

    //     <div className="fixed inset-0 z-10 overflow-y-auto">
    //       <div className=" p-5 mt-5 items-center sm:p-0">
    //         <Transition.Child
    //           as={Fragment}
    //           enter="ease-out duration-300"
    //           enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    //           enterTo="opacity-100 translate-y-0 sm:scale-100"
    //           leave="ease-in duration-200"
    //           leaveFrom="opacity-100 translate-y-0 sm:scale-100"
    //           leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    //         >
    //           <Dialog.Panel className="m-auto sm:my-8 sm:w-full sm:max-w-lg">
    //             <Dialog.Title>
                  <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <form className="space-y-4 md:space-y-6" action="#">
                        {/* attraction name */}
                        <div>
                          <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            className="bg-gray-50 border outline-indigo-300 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-yellow-500 focus:border-yellow-500"
                            placeholder="Attraction Name"
                            required=""
                            // value={form.userName}
                            // onChange={(value) => handleChange(value)}
                          />
                          {/* <p className="text-red-500 text-xs italic">
                            {errors.userName}
                          </p> */}
                        </div>
                        {/* attr desc */}
                        <div>
                          <label
                            htmlFor="description"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Description
                          </label>
                          <textarea
                            name="description"
                            id="description"
                            rows="3"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Description of the tour..."
                            // onChange={(value) => handleChange(value)}
                          ></textarea>
                          {/* <p className="text-red-500 text-xs italic">
                              {errors.description}
                            </p> */}
                        </div>
                        {/* tour duration */}
                        <div>
                          <label
                            htmlFor="duration"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Tour Duration
                          </label>
                          <input
                            type="text"
                            name="duration"
                            id="duration"
                            className="bg-gray-50 border outline-indigo-300 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-yellow-500 focus:border-yellow-500"
                            placeholder="Tour Duration"
                            required=""
                            // value={form.userName}
                            // onChange={(value) => handleChange(value)}
                          />
                          {/* <p className="text-red-500 text-xs italic">
                            {errors.userName}
                          </p> */}
                        </div>
                        {/* status */}
                        <div>
                          <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Status
                          </p>
                          <div class="flex">
                            <div class="flex items-center mr-4">
                              <input
                                id="available"
                                type="radio"
                                value=""
                                name="availability"
                                class="cursor-pointer  w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label
                                for="available"
                                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                Available
                              </label>
                            </div>
                            <div class="flex items-center mr-4">
                              <input
                                id="notAvailable"
                                type="radio"
                                value=""
                                name="availability"
                                class="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label
                                for="notAvailable"
                                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                Not Available
                              </label>
                            </div>
                          </div>
                          {/* <p className="text-red-500 text-xs italic">
                            {errors.password}
                          </p> */}
                        </div>
                        {/* child availability */}
                        <div>
                          <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Child Availability
                          </p>
                          <div class="flex">
                            <div class="flex items-center mr-4">
                              <input
                                id="available"
                                type="radio"
                                value=""
                                name="availability"
                                class="cursor-pointer  w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label
                                for="available"
                                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                Yes
                              </label>
                            </div>
                            <div class="flex items-center mr-4">
                              <input
                                id="notAvailable"
                                type="radio"
                                value=""
                                name="availability"
                                class="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label
                                for="notAvailable"
                                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                No
                              </label>
                            </div>
                          </div>
                          {/* <p className="text-red-500 text-xs italic">
                            {errors.password}
                          </p> */}
                        </div>
                        {/* adult price */}
                        <div>
                          <label
                            htmlFor="adultPrice"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Adult Price
                          </label>
                          <input
                            type="number"
                            name="adultPrice"
                            id="adultPrice"
                            className="bg-gray-50 border outline-indigo-300 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-yellow-500 focus:border-yellow-500"
                            placeholder="Attraction Name"
                            required=""
                            min="0"
                            // value={form.userName}
                            // onChange={(value) => handleChange(value)}
                          />
                          {/* <p className="text-red-500 text-xs italic">
                            {errors.userName}
                          </p> */}
                        </div>
                        {/* child price */}
                        <div>
                          <label
                            htmlFor="childPrice"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Child Price
                          </label>
                          <input
                            type="number"
                            name="childPrice"
                            id="childPrice"
                            className="bg-gray-50 border outline-indigo-300 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-yellow-500 focus:border-yellow-500"
                            placeholder="Attraction Name"
                            required=""
                            min="0"
                            // value={form.userName}
                            // onChange={(value) => handleChange(value)}
                          />
                          {/* <p className="text-red-500 text-xs italic">
                            {errors.userName}
                          </p> */}
                        </div>
                        {/* city */}
                        {/* <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          <button
                            id="dropdownDefaultButton"
                            data-dropdown-toggle="dropdown"
                            class=" bg-white hover:bg-yellow-500/50 focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            type="button"
                          >
                            Dropdown button
                            <svg
                              class="w-2.5 h-2.5 ml-2.5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 10 6"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m1 1 4 4 4-4"
                              />
                            </svg>
                          </button>
                          <div
                            id="dropdown"
                            class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                          >
                            <ul
                              class="py-2 text-sm text-gray-700 dark:text-gray-200"
                              aria-labelledby="dropdownDefaultButton"
                            >
                              <li>
                                <a
                                  href="#"
                                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Dashboard
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Settings
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Earnings
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Sign out
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div> */}
                        <label
                          for="cars"
                          className=" mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          City:
                        </label>
                        <select
                          name="cars"
                          id="cars"
                          class="ml-5 cursor-pointer bg-white w-40 focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 inline-flex items-center"
                        >
                          <option value="volvo">Volvo</option>
                          <option value="saab">Saab</option>
                          <option value="opel">Opel</option>
                          <option value="audi">Audi</option>
                        </select>
                        {/* category */}
                        {/* images */}
                        <div>
                          <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-yellow-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                            onClick={handleSubmit}
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
    //             </Dialog.Title>
    //           </Dialog.Panel>
    //         </Transition.Child>
    //       </div>
    //     </div>
    //   </Dialog>
    // </Transition.Root>
  );
};

export default AttrForm;
