import React from "react";
const WhyChooseUs = () => {
  return (
    <>
      <div className="container p-5 mx-auto">
        <h3 className="text-4xl sm:text-5xl text-center mt-16 pb-8 text-zinc-700 headerFont">
          Why <span className="text-[#be853f]">Choose</span> Us?
        </h3>
        <div className="container p-5 px-10 sm:px-20 md:px-10 lg:px-20  mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            <div
              className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              style={{ boxShadow: "5px 5px 18px grey" }}
            >
              <div className="flex flex-col items-center pb-10">
                <img
                  className="w-24 h-24 m-5 rounded-full shadow-lg"
                  src="https://cdn-icons-png.flaticon.com/512/5346/5346638.png"
                  alt="Bonnie image"
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  +1000 tours
                </h5>
                <p className="text-[#be853f] text-center px-10">
                  Incredible experience at unbeatable prices,that is the
                  Egyption Tickets Tours way
                </p>
                <div className="flex mt-4 space-x-3 md:mt-6 px-10 text-center">
                  <p>
                    To give you that personalized travel experience, we design
                    the holiday For You, as you want it.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              style={{ boxShadow: "5px 5px 18px grey" }}
            >
              <div className="flex flex-col items-center pb-10">
                <img
                  className="w-24 h-24 m-5 rounded-full shadow-lg"
                  src="https://www.pngitem.com/pimgs/m/20-202842_safe-online-payments-with-3-d-secure-secure.png"
                  alt="Bonnie image"
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  Secure Online Payment
                </h5>
                <p className="text-[#be853f] text-center px-10">
                  With Egyption Tickets Tours your money in safe
                </p>
                <div className="flex mt-4 space-x-3 md:mt-6 px-10 text-center">
                  <p>
                    Use your debit card or credit card. Your transactions are
                    protected by 3D Secure and Secure Code.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              style={{ boxShadow: "5px 5px 18px grey" }}
            >
              <div className="flex flex-col items-center pb-10">
                <img
                  className="w-24 h-24 m-5 rounded-full shadow-lg"
                  src="https://icon-library.com/images/call-center-icon-png/call-center-icon-png-22.jpg"
                  alt="Bonnie image"
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  helpline Support
                </h5>
                <p className="text-[#be853f] text-center px-10">
                  helpline for all your questions and grievances.
                </p>
                <div className="flex mt-4 space-x-3 md:mt-6 px-10 text-center">
                  <p>
                    Communication and Information in French, Spanish,
                    Portuguese, Italian, German ,etc…
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyChooseUs;
