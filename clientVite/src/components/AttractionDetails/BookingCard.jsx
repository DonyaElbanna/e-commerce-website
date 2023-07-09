import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { handleToggleBookModal } from "../../rtk/features/bookingSlice";
const BookingCard = ({ attrDetails }) => {
  const [openForm, setOpenForm] = useState(false);
  const dispatch = useDispatch()
  return (
    <>
      <div className="">
        <div className="max-w-md rounded-3xl p-px bg-gradient-to-b from-yellow-200 to-green-300">
          <div className="rounded-[calc(1.5rem-1px)] p-10 bg-white dark:bg-gray-900 text-center">
            <div className="flex font-bold justify-between text-zinc-700">
               <p>Start From</p>
               <p className="text-[#be853f]">
                ${attrDetails.AdultPrice}<sub className="text-zinc-700">/person</sub>
               </p>{" "}
              
            </div>

            <p className="text-zinc-500 mt-2">All taxes and fees included</p>
            <button
              className="bg-[#be853f] mt-3 w-full hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => dispatch(handleToggleBookModal())}
            >
              Booking Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingCard;


// import React, { useState } from "react";
// const BookingCard = ({ attrDetails }) => {
//   const [openForm, setOpenForm] = useState(false);

//   return (
//     <>
//       <div className="">
//         <div className="max-w-md rounded-3xl p-px bg-gradient-to-b from-blue-300 to-pink-300 dark:from-blue-800 dark:to-purple-800 ">
//           <div className="rounded-[calc(1.5rem-1px)] p-10 bg-white dark:bg-gray-900 text-center">
//             <div className="flex font-bold justify-center">
//               Start From{" "}
//               <p className="text-blue-600">
//                 &nbsp;${attrDetails.AdultPrice} Dollar&nbsp;
//               </p>{" "}
//               Per Person
//             </div>

//             <p className="text-green-600 mt-2">All taxes and fees included</p>
//             <button
//               className="bg-blue-500 mt-3 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
//               onClick={() => setOpenForm(true)}
//             >
//               Booking Now
//             </button>
//           </div>
//         </div>
//         {/* <div>{openForm ? <BookingForm setOpenForm={setOpenForm} /> : ""}</div> */}
//         {/* <div>{openForm ? <BookingModal /> : ""}</div> */}
//       </div>
//     </>
//   );
// };

// export default BookingCard;
