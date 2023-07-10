import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Joi from "joi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAuthType,
  handleOpenAuthModal,
} from "../../../rtk/features/authSlice";
import { addUser, editUser } from "../../../rtk/features/usersSlice";

const RegisterForm = () => {
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  const { users, auth } = useSelector((state) => state);

  const dispatch = useDispatch();

  const [form, setForm] = useState({
    userName: users.userEdit?.username || "",
    email: users.userEdit?.email || "",
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
    if (!users.userEdit) {
      axios
        .post("http://localhost:9999/user/add", newUser)
        .then((response) => {
          dispatch(addUser(response.data.newUser));
          dispatch(handleOpenAuthModal(false));
          setOpen(false);
        })
        .catch((error) => {
          console.log("catch post");
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
              "this username already exist, please try another one";
          }
          setErrors(errorData);
        });
    } else {
      await axios
        .put(`http://localhost:9999/user/${users.userEdit._id}`, newUser)
        .then((response) => {
          console.log("then put");

          dispatch(editUser(response.data.user));
          setOpen(false);
        })
        .catch((error) => {
          console.log("catch put");

          const errorData = {};
          console.log(error.response);
          if (!error.response) {
            errorData.globalErr =
              "something went wrong ,please check your connection";
          } else if (
            error.response.data.message === "This email is already registered"
          ) {
            errorData.email = error.response.data.message;
          } else if (error.response.message == "Something went wrong") {
            errorData.globalErr = "Something went wrong!";
          } else {
            errorData.userName =
              "this userName already exist , please try another one";
          }

          setErrors(errorData);
        });
    }
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
          <div className="fixed inset-0 bg-black/50 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className=" p-5 my-16 sm:p-0">
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
                  <div className="shadow-lg shadow-white/30  w-full m-auto bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                          <label
                            htmlFor="userName"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            User Name
                          </label>
                          <input
                            type="text"
                            name="userName"
                            id="userName"
                            className="bg-gray-50 border outline-indigo-300 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-yellow-500 focus:border-yellow-500"
                            placeholder={
                              users.userEdit?.username || "John Elraqi"
                            }
                            required=""
                            value={form.userName}
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
                            className="bg-gray-50 border outline-indigo-300 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-yellow-500 focus:border-yellow-500"
                            placeholder={
                              users.userEdit?.email || "name@email.com"
                            }
                            required=""
                            value={form.email}
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
                            className="bg-gray-50 border outline-indigo-300 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-yellow-500 focus:border-yellow-500"
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
                            className="bg-gray-50 border outline-indigo-300 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-yellow-500 focus:border-yellow-500"
                            required=""
                            onChange={(value) => handleChange(value)}
                          />
                          <p className="text-red-500 text-xs italic">
                            {errors.confirmPassword}
                          </p>
                        </div>
                        <p className="text-red-500 text-xs italic">
                          {errors.globalErr}
                        </p>

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
