import React, { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Joi from "joi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAuthType,
  handleOpenAuthModal,
} from "../../../rtk/features/authSlice";
import { addCity, editCity } from "../../../rtk/features/citiesSlice";

const CityForm = () => {
  // modal
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  const { cities } = useSelector((state) => state);

  const dispatch = useDispatch();
  const [form, setForm] = useState({
    city: cities.cityEdit?.name || "",
    image: cities.cityEdit?.image || "",
  });

  useEffect(() => {
    if (!open) {
      dispatch(handleAuthType("login"));
      dispatch(handleOpenAuthModal(false));
    }
  }, [open]);

  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    city: Joi.string()
      .required()
      .pattern(/^[a-zA-Z]/),
    image: Joi.string()
      .required()
      .pattern(/(http(s?):)|([/|.|\w|\s])*\.(?:jpe?g|png)/),
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
        errorData[name] = message;
      }
      setErrors(errorData);
    } else {
      addCategory();
      setErrors({});
    }
  };

  // send data to server
  const addCategory = async () => {
    const newCity = {
      city: form.city,
      image: form.image,
    };

    if (!cities.cityEdit) {
      await axios
        .post("http://localhost:9999/category", newCity)
        .then((response) => {
          dispatch(addCity(response.data));
          setOpen(false);
        })
        .catch((error) => {
          const errorData = {};
          if (!error.response) {
            errorData.globalErr =
              "something went wrong, please check your connection!";
          } else {
            errorData.globalErr =
              "Request wasn't sent, please check your data!";
          }
          setErrors(errorData);
        });
    } else {
      await axios
        .put(`http://localhost:9999/category/${cities.cityEdit.id}`, newCity)
        .then((response) => {
          dispatch(editCity(response.data));
          setOpen(false);
        })
        .catch((error) => {
          console.log(error);
          const errorData = {};
          if (!error.response) {
            errorData.globalErr =
              "something went wrong, please check your connection!";
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
          <div className="fixed inset-0 bg-black/50  transition-opacity" />
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
                      {/* <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white">
                        Add a new City
                      </h1> */}
                      <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                          <label
                            htmlFor="city"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            City
                          </label>
                          <input
                            type="text"
                            name="city"
                            id="city"
                            className="bg-gray-50 border outline-indigo-300 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-yellow-500 focus:border-yellow-500"
                            placeholder={cities.cityEdit?.name || "Cairo"}
                            required=""
                            value={form.city}
                            onChange={(value) => handleChange(value)}
                          />
                          <p className="text-red-500 text-xs italic">
                            {errors.city}
                          </p>
                        </div>
                        <div>
                          <label
                            htmlFor="image"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            image
                          </label>
                          <input
                            type="text"
                            name="image"
                            id="image"
                            className="bg-gray-50 border outline-indigo-300 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-yellow-500 focus:border-yellow-500"
                            placeholder={
                              cities.cityEdit?.image || "http://url.jpg"
                            }
                            value={form.image}
                            required=""
                            onChange={(value) => handleChange(value)}
                          />
                          <p className="text-red-500 text-xs italic">
                            {errors.image}
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

export default CityForm;
