import Style from "./AboutUs.module.css";

function AboutUs() {
  // <div>
  return (
    <>
      <section className="bg-white">
        <div
          className="hero h-80"
          style={{
            backgroundImage:
              "url(https://i.pinimg.com/originals/b8/fe/3f/b8fe3f94d6b1f6389029e23dfe097e1b.jpg)",
          }}
        >
          <div className="hero-overlay bg-black/60"></div>
          <div className="hero-content text-center ">
            <div className="max-w-md lg:max-w-lg">
              <h1 className="my-5 text-2xl md:text-4xl font-bold text-white font-serif">
                <q>
                  The World Is A Book And Those Who Do Not Travel Read Only One
                  Page
                </q>
              </h1>
              <p className="text-zinc-400 text-sm text-right">
                -SAINT AUGUSTINE
              </p>
            </div>
          </div>
        </div>
        <article className="px-10 sm:px-20 lg:px-28 py-20 text-center">
          <div className="py-5">
            <h2 className="text-[#be853f] text-xl font-bold my-4 uppercase">
              WHO WE ARE ?
            </h2>
            <p className="text-zinc-700">
              Egyption Tickets an Egyptian travel agent that has been
              established in 2000. Egyption Tickets is a pioneer; one of the
              first hundred Egyptian tourism companies in Egypt With over (23)
              years’ experience in the tourism sector.
            </p>
          </div>
          <div className="py-5">
            <h2 className="text-[#be853f] text-xl font-bold my-4 uppercase">
              what we do ?
            </h2>
            <p className="text-zinc-700">
              We are specialist in organizing individual tours, groups,
              incentive, study trips,Our services cover all over Egypt as Cairo,
              Aswan, Luxor, Alexandria, Red sea, sailing Nile Cruise trips from
              Aswan to Luxor, desert trips, Etc. Egyption Tickets have been
              working with tour companies, airlines companies, and hotels for
              over than (20) years. That means we have a relationship that gives
              us special benefits with each of the service providers we book
              with.
            </p>
          </div>
          <div className="py-5">
            <h2 className="text-[#be853f] text-xl font-bold my-4 uppercase">
              Travel made easy !
            </h2>
            <p className="text-zinc-700">
              Our tours cover all the essentials, while providing you the
              building blocks to tailor your dream holiday with modern
              transportation, comfortable accommodation, city tours and plenty
              of meals included. You are then able to tailor your trip with
              Egyption Tickets as we excel at helping you get your vacation
              planned. Not Just any vacation, but exceptional vacations filled
              with inspiring and life-enriching experiences. It is always our
              pleasure to help you to enjoy.
            </p>
          </div>
        </article>
        <article className="bg-[#be853f] py-10 md:py-12 text-center mb-1">
          <h2 className="text-white text-xl font-bold mb-2 uppercase">
            Need help ?
          </h2>
          <p className="text-white">Whatever you need, we’re here.</p>
          <button className="btn bg-white border-0 hover:bg-slate-50 text-zinc-700 shadow-lg mt-6">
            <Link to="/contact">
            contact us
            </Link>
          </button>
        </article>
      </section>
    </>
  );
}

export default AboutUs;

// import Style from "./AboutUs.module.css";
import { Link } from 'react-router-dom';

// function AboutUs() {
//   // <div>
//   return (
//     <section className="py-10 lg:py-20 bg-stone-100 font-poppins dark:bg-gray-800">
//       <div className="max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
//         <div className="flex flex-wrap ">
//           <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0 ">
//             <div className="lg:max-w-md">
//               <div className="px-4 pl-4 mb-6 border-l-4 border-blue-500">
//                 <span className="text-sm text-gray-600 uppercase dark:text-gray-400">
//                   Who we are?
//                 </span>
//                 <h1 className="mt-2 text-3xl font-black text-gray-700 md:text-5xl dark:text-gray-300">
//                   Ninjas
//                 </h1>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 64 80"
//                   x="0px"
//                   y="0px"
//                   className="rotate-0 transition-none"
//                 >
//                   <title>Japanese - 25 - 64 - Solid - Stroke 2 - 2020</title>
//                   <g data-name="Layer 3">
//                     <g>
//                       <path d="M18.09,39l4.25-4.25L14.56,27a3,3,0,1,0-4.25,4.24ZM19,33.8l-1.87,1.87L15.29,33.8l1.87-1.87Zm-5.41-5.4,1.87,1.87-1.87,1.86-1.86-1.86Z" />
//                       <rect
//                         x="13.3"
//                         y="29.95"
//                         width="0.64"
//                         height="0.64"
//                         // transform="translate(-17.4 18.48) rotate(-44.97)"
//                       />
//                       <rect
//                         x="16.84"
//                         y="33.48"
//                         width="0.64"
//                         height="0.64"
//                         // transform="translate(-18.87 22.01) rotate(-44.97)"
//                       />
//                       <path d="M35.28,46.24l6.06-6.93L38,35a10.89,10.89,0,0,1-9.29,0l-3.24,4.23Z" />
//                       <path d="M23.22,38.09l2-2a.87.87,0,0,0,0-1.24l-.17-.17a.87.87,0,0,0-1.24,0l-5.59,5.58A17.51,17.51,0,0,1,23.22,38.09Z" />
//                       <path d="M33.35,34a9,9,0,0,0,8.55-6.2L33.35,29.5l-8.54-1.71A9,9,0,0,0,33.35,34Z" />
//                       <path d="M33.35,20.48l8.95-1.79A6.44,6.44,0,0,0,36.62,13l-1.3-.15,1.18-3-7.17,3.23a6.41,6.41,0,0,0-4.91,5.53Z" />
//                       <path d="M42.18,26.72A9,9,0,0,0,42.35,25V19.7l-9,1.8-9-1.8V25a9,9,0,0,0,.17,1.73l8.83,1.76ZM35.35,23a11.16,11.16,0,0,0,3,0v2a12,12,0,0,0-3,0Zm-4,2a12,12,0,0,0-3,0V23a11.16,11.16,0,0,0,3,0Z" />
//                       <path d="M18.77,49.45a.5.5,0,0,1,1,.16,39.06,39.06,0,0,0-.5,4.45h8.32L34.63,47l-10-7.21-.56.13A15.51,15.51,0,0,0,12.14,54.06h6.13A30.53,30.53,0,0,1,18.77,49.45Z" />
//                       <path d="M35.67,47.31l0,0L29,54.06h16.3a44.49,44.49,0,0,0-.52-4.45.5.5,0,0,1,.41-.57.51.51,0,0,1,.58.41,30.53,30.53,0,0,1,.5,4.61h8.3A15.55,15.55,0,0,0,42.21,39.83Z" />
//                     </g>
//                   </g>
//                   <text
//                     x="0"
//                     y="84"
//                     fill="#000000"
//                     fontSize="5px"
//                     fontWeight="bold"
//                     fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif"
//                   >
//                     from the Noun Project
//                   </text>
//                 </svg>
//               </div>
//               <p className="px-4 mb-10 text-base leading-7 text-gray-500 dark:text-gray-400">
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//                 eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
//                 enim ad minim veniam Lorem ipsum dolor sit amet.
//               </p>
//               <div className="flex flex-wrap items-center">
//                 <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
//                   <div className="p-6 bg-white dark:bg-gray-900">
//                     <span className="text-blue-500 dark:text-blue-400">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="16"
//                         height="16"
//                         fill="currentColor"
//                         className="bi bi-file-earmark-text w-10 h-10"
//                         viewBox="0 0 16 16"
//                       >
//                         <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
//                         <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
//                       </svg>
//                     </span>
//                     <p className="mt-4 mb-2 text-3xl font-bold text-gray-700 dark:text-gray-400">
//                       2097
//                     </p>
//                     <h2 className="text-sm text-gray-700 dark:text-gray-400">
//                       Projects and Plans
//                     </h2>
//                   </div>
//                 </div>
//                 <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
//                   <div className="p-6 bg-white dark:bg-gray-900">
//                     <span className="text-blue-500 dark:text-blue-400">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="16"
//                         height="16"
//                         className="bi bi-people-fill w-10 h-10"
//                         fill="currentColor"
//                         viewBox="0 0 16 16"
//                       >
//                         <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
//                         <path
//                           fillRule="evenodd"
//                           d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
//                         />
//                         <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
//                       </svg>
//                     </span>
//                     <p className="mt-4 mb-2 text-3xl font-bold text-gray-700 dark:text-gray-400">
//                       3,590
//                     </p>
//                     <h2 className="text-sm text-gray-700 dark:text-gray-400">
//                       Helped people
//                     </h2>
//                   </div>
//                 </div>
//                 <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
//                   <div className="p-6 bg-white dark:bg-gray-900">
//                     <span className="text-blue-500 dark:text-blue-400">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="16"
//                         height="16"
//                         className=" bi bi-person-fill w-10 h-10"
//                         fill="currentColor"
//                         viewBox="0 0 16 16"
//                       >
//                         <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
//                       </svg>
//                     </span>
//                     <p className="mt-4 mb-2 text-3xl font-bold text-gray-700 dark:text-gray-400">
//                       74
//                     </p>
//                     <h2 className="text-sm text-gray-700 dark:text-gray-400">
//                       Volunteer
//                     </h2>
//                   </div>
//                 </div>
//                 <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
//                   <div className="p-6 bg-white dark:bg-gray-900">
//                     <span className="text-blue-500 dark:text-blue-400">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="16"
//                         height="16"
//                         className=" bi bi-alarm-fill w-10 h-10"
//                         fill="currentColor"
//                         viewBox="0 0 16 16"
//                       >
//                         <path d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07a7.001 7.001 0 0 1 3.274 12.474l.601.602a.5.5 0 0 1-.707.708l-.746-.746A6.97 6.97 0 0 1 8 16a6.97 6.97 0 0 1-3.422-.892l-.746.746a.5.5 0 0 1-.707-.708l.602-.602A7.001 7.001 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5zm2.5 5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.035 8.035 0 0 0 .86 5.387zM11.613 1.86a2.5 2.5 0 1 1 3.527 3.527 8.035 8.035 0 0 0-3.527-3.527z" />
//                       </svg>
//                     </span>
//                     <p className="mt-4 mb-2 text-3xl font-bold text-gray-700 dark:text-gray-400">
//                       100
//                     </p>
//                     <h2 className="text-sm text-gray-700 dark:text-gray-400">
//                       Timing
//                     </h2>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
//             <img
//               src="https://i.postimg.cc/9MW8G96J/pexels-the-coach-space-2977565.jpg"
//               alt=""
//               className="relative z-40 object-cover w-full h-full rounded"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default AboutUs;
