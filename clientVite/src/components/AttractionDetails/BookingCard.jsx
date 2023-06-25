import React, { useState } from "react";
import BookingForm from "./BookingForm";
const BookingCard = () => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <>
      <div className="">
        <div className="max-w-md rounded-3xl p-px bg-gradient-to-b from-blue-300 to-pink-300 dark:from-blue-800 dark:to-purple-800 ">
          <div className="rounded-[calc(1.5rem-1px)] p-10 bg-white dark:bg-gray-900 text-center">
            <div className="flex font-bold justify-center">
              Start From <p className="text-blue-600">&nbsp;100 Dollar&nbsp;</p>{" "}
              Per Person
            </div>

            <p className="text-green-600 mt-2">All taxes and fees included</p>
            <button
              className="bg-blue-500 mt-3 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => setOpenForm(true)}
            >
              Booking Now
            </button>
          </div>
        </div>
        <div>{openForm ? <BookingForm setOpenForm={setOpenForm} /> : ""}</div>
      </div>
    </>
  );
};

export default BookingCard;
