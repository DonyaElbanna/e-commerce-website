import { Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from "./ContactUs.module.css";
import backgroundImg from "../../assets/try2.webp";

function ContactUs() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tel: "",
  });
  function handleSubmit(event) {
    event.preventDefault();
    event.target.form[0].value;
    setFormData({
      name: event.target.form[0].value,
      email: event.target.form[1].value,
      tel: event.target.form[2].value,
    });
    const { name, email, tel } = formData;
    navigate("/");
  }

  return (
    <div className="container my-24 mx-auto md:px-6">
      <section className="mb-32 bg-white">
        <div
          className="relative h-[400px] overflow-hidden bg-cover bg-[50%] bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImg})` }}
        ></div>
        <div className="container px-6 md:px-12">
          <div className="block rounded-lg bg-slate-100 px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] md:py-16 md:px-12 -mt-[100px] backdrop-blur-[30px]">
            <div className="flex flex-wrap">
              <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6">
                <form
                  onSubmit={(e) => {
                    window.my_modal_1.showModal();
                    e.preventDefault();
                  }}
                >
                  <div className="relative mb-6" data-te-input-wrapper-init>
                    <input
                      required
                      type="text"
                      className="text-zinc-900 peer block min-h-[auto] w-full rounded border-0 bg-white py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-zinc-900 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-100"
                      id="exampleInput90"
                      placeholder="Name"
                    />
                    {/* <label
                      className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-zinc-700 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-[#be853f] peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
                      htmlFor="exampleInput90"
                    >
                      Name
                    </label> */}
                  </div>
                  <div className="relative mb-6" data-te-input-wrapper-init>
                    <input
                      required
                      type="email"
                      className="text-zinc-900 peer block min-h-[auto] w-full rounded border-0 bg-white py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-zinc-900 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-100"
                      id="exampleInput91"
                      placeholder="Email address"
                    />
                    {/* <label
                      className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-zinc-700 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-[#be853f] peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
                      htmlFor="exampleInput91"
                    >
                      Email address
                    </label> */}
                  </div>
                  <div className="relative mb-6" data-te-input-wrapper-init>
                    <textarea
                      className="text-zinc-900 peer block min-h-[auto] w-full rounded border-0 focus:ring-transparent bg-white py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-zinc-900 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-100"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      placeholder="Your message"
                      required
                    ></textarea>
                    {/* <label
                      htmlFor="exampleFormControlTextarea1"
                      className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-zinc-700 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-[#be853f] peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
                    >
                      Message
                    </label> */}
                  </div>
                  <div className="mb-6 inline-block min-h-[1.5rem] justify-center pl-[1.5rem] md:flex">
                    <input
                      className="relative float-left mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-zinc-400 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-white before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-transparent checked:bg-[#be853f] checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
                      type="checkbox"
                      value=""
                      id="exampleCheck96"
                    />
                    <label
                      className="inline-block pl-[0.15rem] hover:cursor-pointer text-zinc-400 "
                      htmlFor="exampleCheck96"
                    >
                      Send me a copy of this message
                    </label>
                  </div>
                  <input
                    type="submit"
                    value={"Send"}
                    // data-te-ripple-init
                    // data-te-ripple-color="light"
                    onClick={() => console.log("yess")}
                    // onClick={() => window.my_modal_1.showModal()}
                    // onSubmit={() => window.my_modal_1.showModal()}
                    className="mb-6 inline-block w-full rounded bg-[#be853f] px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] lg:mb-0"
                  />
                </form>
              </div>
              <div className="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
                <div className="flex flex-wrap">
                  <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:w-6/12">
                    <div className="flex items-start">
                      <div className="shrink-0">
                        <div className="inline-block rounded-md bg-primary-100 p-4 text-primary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="#be853f"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-6 grow">
                        <p className="mb-2 font-bold text-zinc-600 ">
                          Technical support
                        </p>
                        <p className="text-zinc-500">
                          support@egyption tickets.com
                        </p>
                        <p className="text-zinc-500">+20-125-555-3059</p>
                      </div>
                    </div>
                  </div>
                  <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:w-6/12">
                    <div className="flex items-start">
                      <div className="shrink-0">
                        <div className="inline-block rounded-md bg-primary-100 p-4 text-primary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="#be853f"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-6 grow">
                        <p className="mb-2 font-bold text-zinc-600">
                          Sales questions
                        </p>
                        <p className="text-zinc-500">
                          sales@egyption tickets.com
                        </p>
                        <p className="text-zinc-500">+20-125-555-1891</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <dialog id="my_modal_1" className="modal bg-black/25">
          <form method="dialog" className="modal-box bg-white">
            <p className="py-4 text-zinc-700 text-lg">
              your massage send successfully
            </p>
            <div className="modal-action">
              <button className="btn border-0 bg-zinc-700 hover:bg-[#be853f] text-white">
                Close
              </button>
            </div>
          </form>
        </dialog>
      </section>
    </div>
  );
}

export default ContactUs;

// import { Alert } from "@mui/material";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Style from "./ContactUs.module.css";

// function ContactUs() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     tel: "",
//   });
//   function handleSubmit(event) {
//     event.preventDefault();
//     event.target.form[0].value;
//     setFormData({
//       name: event.target.form[0].value,
//       email: event.target.form[1].value,
//       tel: event.target.form[2].value,
//     });
//     const { name, email, tel } = formData;
//     navigate("/");
//   }

//   return (
//     <div className="relative flex flex-wrap justify-center  dark:bg-gray-900 sm:items-center">
//       {/* <div className="mt-8"></div> */}
//       <div className="mt-24 mb-24 overflow-hidden w-full min-w-min">
//         {/* <div className="grid grid-cols-1 md:grid-cols-2 scroll-ml-7"> */}
//         <div className="flex flex-wrap justify-evenly ml-20">
//           <div className="w-full ml-28 sm:ml-36 md:ml-20  md:w-5/12 dark:bg-gray-800">
//             <h1 className="text-4xl sm:text-5xl text-gray-800 dark:text-white font-extrabold tracking-tight">
//               Contact Us
//             </h1>
//             <p className="text-normal text-xs sm:text-2xl font-medium text-gray-400 dark:text-gray-400 mt-2">
//               Fill in the form <br />
//               to start a conversation
//             </p>
//             <div className="flex items-center mt-8 text-gray-600 dark:text-gray-400">
//               <svg
//                 fill="none"
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="1.5"
//                 viewBox="0 0 24 24"
//                 className="w-8 h-8 text-gray-500"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="1.5"
//                   d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                 />
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="1.5"
//                   d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                 />
//               </svg>
//               <div className="ml-4 text-md tracking-wide font-semibold w-40">
//                 8723 Mokattam Cairo Egypt
//               </div>
//             </div>

//             <div className="flex items-center mt-5 text-gray-600 dark:text-gray-400">
//               <svg
//                 fill="none"
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="1.5"
//                 viewBox="0 0 24 24"
//                 className="w-8 h-8 text-gray-500"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="1.5"
//                   d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//                 />
//               </svg>
//               <div className="ml-4 text-md tracking-wide font-semibold w-40">
//                 +20 122 345 6789
//               </div>
//             </div>

//             <div className="flex items-center mt-6 text-gray-600 dark:text-gray-400">
//               <svg
//                 fill="none"
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="1.5"
//                 viewBox="0 0 24 24"
//                 className="w-8 h-8 text-gray-500"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="1.5"
//                   d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                 />
//               </svg>
//               <div className="ml-4 text-md tracking-wide font-semibold w-40">
//                 info@acme.org
//               </div>
//             </div>
//           </div>

//           <div
//             className="mr-12 mt-10 lg:w-5/12 md:w-7/12 bg-slate-300 rounded-xl"
//             // style={{ width: "400px" }}
//           >
//             <form className="p-6 flex flex-col justify-center">
//               <div className="">
//                 <label htmlFor="name" className="hidden">
//                   Full Name
//                 </label>
//                 <input
//                   required
//                   type="name"
//                   name="name"
//                   id="name"
//                   placeholder="Full Name"
//                   className="w-full mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-amber-400 border-2 focus:outline-none"
//                 />
//               </div>
//               <div className="mt-2">
//                 <label htmlFor="email" className="hidden">
//                   Email
//                 </label>
//                 <input
//                   required
//                   type="email"
//                   name="email"
//                   id="email"
//                   placeholder="Email"
//                   className="w-full mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border-2 border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-amber-400 focus:outline-none"
//                 />
//               </div>
//               <div className="mt-2">
//                 <label htmlFor="tel" className="hidden">
//                   Number
//                 </label>
//                 <input
//                   required
//                   type="tel"
//                   name="tel"
//                   id="tel"
//                   placeholder="Telephone Number"
//                   className="w-full mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border-2 border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-amber-400 focus:outline-none"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 onClick={handleSubmit}
//                 className="m-auto w-28 bg-amber-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-amber-500  ease-in-out duration-300"
//               >
//                 Submit
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ContactUs;

// {
//   /* <div classNameName="mb-6 inline-block min-h-[1.5rem] justify-center pl-[1.5rem] md:flex">
//                   <input
//                     classNameName="relative float-left mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
//                     type="checkbox"
//                     value=""
//                     id="exampleCheck96"
//                     defaultChecked
//                   />
//                   <label
//                     classNameName="inline-block pl-[0.15rem] hover:cursor-pointer"
//                     htmlFor="exampleCheck96"
//                   >
//                     Send me a copy of this message
//                   </label>
//                 </div> */
// }
