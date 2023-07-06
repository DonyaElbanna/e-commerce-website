import { Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from "./ContactUs.module.css";

function ContactUs() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tel: "",
  });
  const [error, setError] = useState(null);
  function handleSubmit(event) {
    event.preventDefault();
    event.target.form[0].value;
    setFormData({
      name: event.target.form[0].value,
      email: event.target.form[1].value,
      tel: event.target.form[2].value,
    });
    const { name, email, tel } = formData;
    // Check if required fields are filled
    if (!name || !email || !tel) {
      //   <Alert severity="error">Please fill in all the required fields.</Alert>;
      setError("Please fill in all the required fields.");
      return;
    }
    setError(null);
    navigate("/");
  }
  //   console.log(formData);

  return (
    <div className="relative flex flex-wrap justify-center  dark:bg-gray-900 sm:items-center">
      {/* <div className="mt-8"></div> */}
      <div className="mt-24 mb-24 overflow-hidden w-full min-w-min">
        {/* <div className="grid grid-cols-1 md:grid-cols-2 scroll-ml-7"> */}
        <div className="flex flex-wrap justify-evenly ml-20">
          <div id="aa" className="w-full ml-14 md:w-5/12 dark:bg-gray-800">
            <h1 className="text-4xl sm:text-5xl text-gray-800 dark:text-white font-extrabold tracking-tight">
              Contact Us
            </h1>
            <p className="text-normal text-xs sm:text-2xl font-medium text-gray-400 dark:text-gray-400 mt-2">
              Fill in the form <br />
              to start a conversation
            </p>
            <div className="flex items-center mt-8 text-gray-600 dark:text-gray-400">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                className="w-8 h-8 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div className="ml-4 text-md tracking-wide font-semibold w-40">
                8723 Mokattam Cairo Egypt
              </div>
            </div>

            <div className="flex items-center mt-5 text-gray-600 dark:text-gray-400">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                className="w-8 h-8 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <div className="ml-4 text-md tracking-wide font-semibold w-40">
                +20 122 345 6789
              </div>
            </div>

            <div className="flex items-center mt-6 text-gray-600 dark:text-gray-400">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                className="w-8 h-8 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <div className="ml-4 text-md tracking-wide font-semibold w-40">
                info@acme.org
              </div>
            </div>
          </div>

          <div
            id="ss"
            className="mr-12 mt-10 bg-slate-300 rounded-xl"
            style={{ width: "700px" }}
          >
            <form className="p-6 flex flex-col justify-center">
              <div className="grid grid-cols-12">
                <div className="col-span-8">
                  <div className="flex flex-col">
                    <label htmlFor="name" className="hidden">
                      Full Name
                    </label>
                    <input
                      required
                      type="name"
                      name="name"
                      id="name"
                      placeholder="Full Name"
                      className=" w-11/12 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-amber-400 border-2 focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col mt-2">
                    <label htmlFor="email" className="hidden">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      className=" w-11/12 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border-2 border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col mt-2">
                    <label htmlFor="tel" className="hidden">
                      Number
                    </label>
                    <input
                      required
                      type="tel"
                      name="tel"
                      id="tel"
                      placeholder="Telephone Number"
                      className=" w-11/12 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border-2 border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
                <div className=" w-48">
                  {error && (
                    <div
                      //   className="ml-8 mt-10 h-28 bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
                      className="ml-8 mt-10 h-28 bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
                      role="alert"
                    >
                      <p className="font-bold">Be Warned</p>
                      <p>{error}</p>
                    </div>
                  )}
                </div>
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className=" bg-amber-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-amber-500  ease-in-out duration-300"
              >
                Submit
              </button>
            </form>
          </div>
          {/* {error && <Alert severity="error">{error}</Alert>} */}
        </div>
      </div>
    </div>
  );
}

export default ContactUs;

{
  /* <div classNameName="mb-6 inline-block min-h-[1.5rem] justify-center pl-[1.5rem] md:flex">
                  <input
                    classNameName="relative float-left mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                    type="checkbox"
                    value=""
                    id="exampleCheck96"
                    defaultChecked
                  />
                  <label
                    classNameName="inline-block pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="exampleCheck96"
                  >
                    Send me a copy of this message
                  </label>
                </div> */
}
