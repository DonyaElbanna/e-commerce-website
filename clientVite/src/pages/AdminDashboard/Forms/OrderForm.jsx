import React, { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Joi from "joi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAuthType,
  handleOpenAuthModal,
} from "../../../rtk/features/authSlice";
import { addOrder } from "../../../rtk/features/ordersSlice";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const OrderForm = () => {
  // modal
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  const { users, cities, attractions } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [cityOpt, setCityOpt] = useState("");
  const [attrsOpts, setAttrOpts] = useState([]);
  const [userId, setUserId] = useState("");
  const [date, setDate] = useState("");

  const [form, setForm] = useState({
    attrID: "",
    adults: "",
    children: "",
  });

  useEffect(() => {
    if (!open) {
      dispatch(handleAuthType("login"));
      dispatch(handleOpenAuthModal(false));
    }
  }, [open]);

  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    attrID: Joi.string().required(),
    adults: Joi.number().min(0).required(),
    children: Joi.number().min(0).required(),
  });

  const handleChangeUserID = (e) => {
    if (
      users.users.filter((user) => user.email == e.target.value).length !== 0
    ) {
      setErrors({});
      const userEmail = e.target.value;
      const userId = users.users.find((user) => user.email == userEmail)._id;
      setUserId(userId);
    } else {
      const errorData = {};
      errorData.email = " No user is found with this email";
      setErrors(errorData);
    }
  };

  const handleChangeCityOpt = (e) => {
    const cityIdOpt = e.target.value;
    setCityOpt(cityIdOpt);
    setAttrOpts(
      attractions.Attractions.filter((attr) => attr.category._id == cityIdOpt)
    );
  };

  const formatDate = (e) => {
    const slcDate = e.$d.toLocaleDateString();
    console.log(slcDate);
    setDate(slcDate);
  };
  console.log(date);

  const handleChangeForm = (e) => {
    console.log(e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddOrder = async () => {
    const newOrder = {
      userID: userId,
      attrID: form.attrID,
      adults: form.adults,
      children: form.children,
      expectedDate: "7/13/2023",
    };
    console.log(newOrder);
    const attr = attractions.Attractions.filter(
      (attr) => attr._id == form.attrID
    )[0];
    const user = users.users.filter((user) => user._id == userId)[0];
    // console.log(users.users.filter((user) => user._id == userId)[0]);
    // console.log(newOrder);
    await axios
      .post("http://localhost:9999/order", newOrder)
      .then((response) => {
        const order = { ...response.data, attraction: attr, user: user };
        dispatch(addOrder(order));
        setOpen(false);
      })
      .catch((error) => {
        const errorData = {};
        if (!error.response) {
          errorData.globalErr =
            "something went wrong, please check your connection!";
        } else {
          errorData.globalErr = "Request wasn't sent, please check your data!";
        }
        setErrors(errorData);
      });
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
      handleAddOrder();
      setErrors({});
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
                      <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                          <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            className="bg-gray-50 border outline-indigo-300 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-yellow-500 focus:border-yellow-500"
                            placeholder={"name@email.com"}
                            required=""
                            value={form.userID}
                            onChange={(e) => handleChangeUserID(e)}
                          />
                          <p className="text-red-500 text-xs italic">
                            {errors.email}
                          </p>
                        </div>
                        {userId ? (
                          <div>
                            <label
                              htmlFor="city"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              City
                            </label>

                            <select
                              defaultValue="Pick a city"
                              id="city"
                              required
                              name="category"
                              onChange={(e) => handleChangeCityOpt(e)}
                              className="select rounded-none w-full pb-4 text-slate-700 bg-transparent border-x-neutral-500  border-0 border-b-2 appearance-none  focus:outline-none focus:ring-0 focus:border-[#be853f] peer"
                            >
                              <option disabled>Pick a city</option>
                              {cities.cities?.map((cat) => (
                                <option
                                  key={cat._id}
                                  value={cat._id}
                                  className="text-[#be853f]"
                                >
                                  {cat.city}
                                </option>
                              ))}
                            </select>
                            <p className="text-red-500 text-xs italic">
                              {errors.category}
                            </p>
                          </div>
                        ) : (
                          <div className="text-center">
                            Enter a user's email to make an order
                          </div>
                        )}
                        {cityOpt && (
                          <div>
                            <label
                              htmlFor="tour"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Tour
                            </label>
                            <select
                              defaultValue="Pick a tour"
                              id="tour"
                              required
                              name="attrID"
                              // value={form.attrID}
                              onChange={(e) => handleChangeForm(e)}
                              className="select rounded-none  w-full pb-4 text-slate-700 bg-transparent border-x-neutral-500  border-0 border-b-2 appearance-none  focus:outline-none focus:ring-0 focus:border-[#be853f] peer"
                            >
                              <option disabled value="Pick a tour">
                                Pick a tour
                              </option>
                              {attrsOpts.map((attr) => (
                                <option
                                  key={attr._id}
                                  value={attr._id}
                                  className="text-[#be853f]"
                                >
                                  {attr.name}
                                </option>
                              ))}
                            </select>
                            <p className="text-red-500 text-xs italic">
                              {errors.attrID}
                            </p>
                          </div>
                        )}
                        {form.attrID && (
                          <div className="grid grid-rows-12 grid-flow-col gap-5 lg:gap-10 text-center">
                            <div>
                              <label
                                htmlFor="adults"
                                className="block text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Adult Number
                              </label>
                              <input
                                type="number"
                                name="adults"
                                id="adults"
                                className="block py-1 w-full  text-black border-x-neutral-500  bg-transparent  border-0 border-b-2  appearance-none  focus:outline-none focus:ring-0 focus:border-[#be853f] peer"
                                placeholder=" "
                                required
                                min="0"
                                value={form.adults}
                                onChange={(e) => handleChangeForm(e)}
                              />
                              <p className="text-red-500 text-xs italic">
                                {errors.adults}
                              </p>
                            </div>
                            <div>
                              <label
                                htmlFor="children"
                                className="block text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Children Number
                              </label>
                              <input
                                type="number"
                                name="children"
                                id="children"
                                className="block py-1 w-full  text-black border-x-neutral-500  bg-transparent  border-0 border-b-2  appearance-none  focus:outline-none focus:ring-0 focus:border-[#be853f] peer"
                                required
                                min="0"
                                value={form.children}
                                onChange={(e) => handleChangeForm(e)}
                              />
                              <p className="text-red-500 text-xs italic">
                                {errors.children}
                              </p>
                            </div>
                          </div>
                        )}
                        {form.adults && form.children && (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              disablePast
                              selectedSections={"day"}
                              onChange={(e) => {
                                formatDate(e);
                              }}
                              value={date}
                              reduceAnimations
                              sx={{
                                width: "100%",
                                ".css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                  {
                                    borderColor: "#be853f",
                                  },
                              }}
                            />
                          </LocalizationProvider>
                        )}
                        <div>
                          <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-yellow-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                            onClick={(e) => handleSubmit(e)}
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

export default OrderForm;
