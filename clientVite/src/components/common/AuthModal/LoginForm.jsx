import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Joi from "joi";

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
        className="relative z-10"
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

        <div className="scale-50">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <Dialog.Title>
                  <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                      <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                      />
                      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                      </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
                            Sign in
                          </button>
                        </div>
                      </form>

                      <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{" "}
                        <a
                          href="#"
                          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                          Start a 14 day free trial
                        </a>
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
