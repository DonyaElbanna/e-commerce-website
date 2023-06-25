import React, { Fragment, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import Joi from "joi";
const botright_vite = new URL(
  "../../../assets/loginBackground.jpg",
  import.meta.url
).href;
const LoginForm = () => {
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .pattern(/^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/),
    password: Joi.string().required().min(8),
  });

  const handleChange = (e) => {
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
        errorData[name] = message;
      }
      setErrors(errorData);
    } else {
      setErrors({});
      setOpen(false);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50 max-h-50"
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

        <div className="fixed inset-0 z-10   ">
          <div className="flex max-h-50  items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="  transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8  sm:max-w-sm  border-solid border-2 border-yellow-500 ">
                <Dialog.Title className=" ">
                  <div className="flex ">
                    <img
                      className="w-full "
                      src={botright_vite}
                      alt="Your Company"
                    />
                  </div>
                  <div className="flex min-h-full flex-1 flex-col justify-center px-6 pb-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                      <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Log in to your account
                      </h2>
                    </div>
                    <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                      <form className="space-y-6">
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Email address
                          </label>
                          <div className="mt-2">
                            <input
                              type="email"
                              name="email"
                              id="email"
                              className="bg-gray-50 border outline-indigo-300 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="name@company.com"
                              required=""
                              onChange={(value) => handleChange(value)}
                            />
                          </div>
                          <p className="text-red-500 text-xs italic">
                            {errors.email}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center justify-between">
                            <label
                              htmlFor="password"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Password
                            </label>
                            <div className="text-sm">
                              <a
                                href="#"
                                className="font-semibold text-indigo-600 hover:text-indigo-500"
                              >
                                Forgot password?
                              </a>
                            </div>
                          </div>
                          <div className="mt-2">
                            <input
                              type="password"
                              name="password"
                              id="password"
                              placeholder="••••••••"
                              className="bg-gray-50 border outline-indigo-300 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              required=""
                              onChange={(value) => handleChange(value)}
                            />
                          </div>
                          <p className="text-red-500 text-xs italic">
                            {errors.password}
                          </p>
                        </div>

                        <div>
                          <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={handleSubmit}
                          >
                            Log in
                          </button>
                        </div>
                        <div>
                          <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={handleSubmit}
                          >
                            Log in as Guest
                          </button>
                        </div>
                        <div className="flex flex-row items-center justify-center lg:justify-center">
                          <button
                            type="button"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            className="mx-1 h-9 w-9 rounded-full bg-primary uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="mx-auto h-3.5 w-3.5"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                            </svg>
                          </button>

                          <button
                            type="button"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            className="mx-1 h-9 w-9 rounded-full bg-primary uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="mx-auto h-3.5 w-3.5"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                            </svg>
                          </button>

                          <button
                            type="button"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            className="mx-1 h-9 w-9 rounded-full bg-primary uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="mx-auto h-3.5 w-3.5"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                            </svg>
                          </button>
                        </div>
                      </form>

                      <p className="mt-5 text-center text-sm text-gray-500">
                        Not a member?{" "}
                        <Link
                          className="font-semibold text-indigo-600 hover:text-indigo-500"
                          to="/register"
                        >
                          Sign Up
                        </Link>
                      </p>
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

export default LoginForm;
