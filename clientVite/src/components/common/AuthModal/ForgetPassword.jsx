import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Joi from "joi";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  handleAuthType,
  handleToggleAuthModal,
} from "../../../rtk/features/authSlice";
import axios from "axios";
const ForgetPassword = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [sending, setSending] = useState("beforeSending"); //sending  , after Sending
  const cancelButtonRef = useRef(null);
  const location = useLocation();
  useEffect(() => {
    if (!open) {
      dispatch(handleAuthType("login"));
      dispatch(handleToggleAuthModal());
    }
  }, [open]);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    email: Joi.string()
      .required()
      .pattern(/^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/),
  });
  const handleChange = (e) => {
    setErrors({});
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = schema.validate({ email });
    const { error } = err;
    if (error) {
      const errorData = {};
      let name = "email";
      let message = error.message;
      if (message === `"${name}" is not allowed to be empty`)
        message = `${name} is required `;
      else message = "Invalid email pattern";
      errorData["email"] = message;
      setErrors(errorData);
    } else {
      forgetPassword();
      setErrors({});
    }
  };
  const forgetPassword = async () => {
    try {
      setSending("sending");
      console.log(email);
      const { data } = await axios.post(
        "http://localhost:9999/auth/forgetPassword",
        {
          emailAddress: email,
        }
      );
      console.log("ok");
      setSending("afterSending");
      dispatch(handleAuthType("login"));
      dispatch(handleToggleAuthModal());
    } catch (error) {
      setSending("beforeSending");
      const errorData = {};
      if (!error.response) {
        errorData.invalidCradintials =
          "something went wrong ,please check your connection";
      } else {
        console.log("eeeeeeeeeeeeeeeeee");
        errorData.invalidCradintials = error.response.data.message;
      }
      setErrors(errorData);
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
          <div className="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className=" p-5 mt-20 items-center sm:p-0">
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
                        Reset Email
                      </h1>
                      <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                          <input
                            type="email"
                            placeholder="ayazain@gmail.com"
                            className="bg-gray-50 border outline-none border-gray-300 text-zinc-800 sm:text-sm rounded-lg focus:ring-[#be853f] focus:border-[#be853f] block w-full p-2.5 "
                            value={email}
                            onChange={(value) => handleChange(value)}
                          />
                        </div>
                        <p className="text-red-500 text-xs italic">
                          {errors.email}
                        </p>
                        <p className="text-red-500 text-xs italic mt-1 text-left mx-3">
                          {errors.invalidCradintials}
                        </p>
                        <div>
                          <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-[#be853f] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm enabled:hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={handleSubmit}
                            disabled={sending === "sending"}
                          >
                            {sending === "sending"
                              ? "Sending ......"
                              : sending === "beforeSending"
                              ? "Send Varification mail"
                              : "Email sent successfuly "}
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

export default ForgetPassword;
