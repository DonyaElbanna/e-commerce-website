import { Virtual } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/virtual";

const Categories = () => {
  const cats = [
    { id: 1, name: "Monuments", image: "https://shorturl.at/rsxzL" },
    { id: 2, name: "Nile Cruise", image: "https://shorturl.at/iJMSW" },
    { id: 3, name: "Museums", image: "https://shorturl.at/fhBL4" },
    { id: 4, name: "Safari", image: "https://shorturl.at/arJPT" },
    { id: 5, name: "Diving", image: "https://shorturl.at/gtKNO" },
    { id: 6, name: "Hiking", image: "https://shorturl.at/vxOX9" },
    { id: 7, name: "Spas", image: "https://shorturl.at/hmJZ4" },
    { id: 8, name: "Nightlife", image: "https://shorturl.at/efj79" },
  ];

  return (
    <>
      <div className="container px-5 mx-auto">
        <Swiper
          autoplay
          modules={[Virtual]}
          breakpoints={{
            400: {
              width: 400,
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
          id="main"
          width="480"
          navigation
          spaceBetween={20}
          slidesPerView={1}
          virtual
          className="relative carousel-center w-100 px-4 pt-4 pb-1 bg-neutral rounded-box my-10"
        >
          <div>
            {Object.values(cats).map((cat, index) => (
              <SwiperSlide key={cat.id} virtualIndex={index}>
                <div key={cat.id} className="carousel-item h-32">
                  <div
                    className="relative block bg-gray-900 group h-28 "
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="rounded w-48 h-28 group-hover:opacity-50"
                    />
                    <p className="absolute place-self-center top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all opacity-0 group-hover:opacity-100 group-hover:translate-y-0 text-xl text-white">
                      {cat.name}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </>
  );
};

export default Categories;
