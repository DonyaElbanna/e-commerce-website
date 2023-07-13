import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/virtual";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/keyboard";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/zoom";
import { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from "swiper";

const Categories = ({ cityCats, handleFilter, resetFilters }) => {
  return (
    <>
      <div className="my-8">
        <div className="flex justify-between w-4/5 mb-5 mx-auto">
          <p className="text-2xl font-medium text-zinc-500">Filter Your category</p>
          <button
            onClick={resetFilters}
            className="btn btn-outline  btn-accent font-medium rounded-full text-md"
          >
            Reset Filters
          </button>
        </div>
        <div className="container mx-auto px-3 flex items-center w-4/5">
          <Swiper
            modules={[Autoplay, Keyboard, Pagination, Scrollbar, Zoom]}
            keyboard={true}
            pagination={true}
            scrollbar={true}
            breakpoints={{
              300: {
                width: 300,
                slidesPerView: 1,
              },
              550: {
                width: 550,
                slidesPerView: 2,
              },
              768: {
                width: 768,
                slidesPerView: 3,
              },
              1024: {
                width: 1024,
                slidesPerView: 4,
              },
            }}
            spaceBetween={0}
            slidesPerView={4}
            className="cursor-grab relative carousel-center w-100 px-4 pt-8 pb-4 bg-stone-600/20 rounded-box"
          >
            <div>
              {cityCats.map((cat, index) => (
                <SwiperSlide
                  key={cat._id}
                  virtualIndex={index}
                  onClick={() => handleFilter(cat._id)}
                >
                  <div className="carousel-item h-32">
                    <div className="relative  bg-gray-900 group h-28 rounded-md">
                      <img
                        src={cat.image}
                        alt={cat.type}
                        className="rounded-md w-48 h-28 group-hover:opacity-50"
                      />
                      <p className="absolute place-self-center top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all opacity-0 group-hover:opacity-100 group-hover:translate-y-0 text-xl text-white">
                        {cat.type}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
          {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="#be853f"
              className="w-16 h-8 stroke-2	ml-3 animate-ping	"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
              />
            </svg> */}
        </div>
      </div>
    </>
  );
};

export default Categories;
// import React from "react";
// import { Virtual } from "swiper";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/virtual";

// const Categories = ({ cityCats, handleFilter, resetFilters }) => {
//   return (
//     <>
//       <div className="flex justify-between">
//         <p className="text-3xl text-zinc-700 headerFont ms-8 mb-8">Filter Your category</p>
//         <button
//           onClick={resetFilters}
//           className="btn btn-outline btn-accent  headerFont font-medium rounded-full text-md px-4 mr-2 me-16 mb-2"
//         >
//           Reset Filters
//         </button>
//       </div>
//       <div className="container px-5 mx-auto flex items-center">
//         <Swiper
//           autoplay
//           modules={[Virtual]}
//           breakpoints={{
//             300: {
//               width: 300,
//               slidesPerView: 1,
//             },
//             550: {
//               width: 550,
//               slidesPerView: 2,
//             },
//             768: {
//               width: 768,
//               slidesPerView: 3,
//             },
//             1024: {
//               width: 1024,
//               slidesPerView: 4,
//             },
//           }}
//           spaceBetween={0}
//           slidesPerView={4}
//           loop={true}
//           virtual
//           className="cursor-grab relative carousel-center w-100 px-4 py-8 bg-stone-600/20 rounded-box"
//         >
//           <div>
//             {cityCats.map((cat, index) => (
//               <SwiperSlide
//                 key={cat._id}
//                 virtualIndex={index}
//                 onClick={() => handleFilter(cat._id)}
//               >
//                 <div className="carousel-item h-32">
//                   <div className="relative block bg-gray-900 group h-28 rounded-md">
//                     <img
//                       src={cat.image}
//                       alt={cat.type}
//                       className="rounded-md w-48 h-28 group-hover:opacity-50"
//                     />
//                     <p className="absolute place-self-center top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all opacity-0 group-hover:opacity-100 group-hover:translate-y-0 text-xl text-white">
//                       {cat.type}
//                     </p>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </div>
//         </Swiper>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={1}
//           stroke="#be853f"
//           className="w-16 h-8 stroke-2	ml-3 animate-ping	"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
//           />
//         </svg>
//       </div>

//     </>
//   );
// };

// export default Categories;
