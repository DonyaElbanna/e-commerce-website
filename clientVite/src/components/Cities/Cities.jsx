import React from "react";
import { Link } from "react-router-dom";
import gif from "../../assets/gih.gif";
import { useSelector } from "react-redux";

const Categories = () => {
  const { cities, categories } = useSelector((state) => state);

  return (
    <div>
      <div className="container px-20 mx-auto mb-5">
        <h3 className="text-4xl md:text-5xl mt-10 mb-4 text-center text-zinc-700 headerFont">
          Cities
        </h3>
        <h3 className="text-2xl md:text-3xl mb-10 text-center text-zinc-500	headerFont">
          Browse our <span className="text-[#be853f]">amazing</span>{" "}
          destinations
        </h3>
        {cities.cities.length == 0 ? (
          <img
            src={gif}
            className="mx-auto"
            style={{ width: "250px", marginTop: "180px" }}
          />
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 m-auto"
            // style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
          >
            {cities.cities.map((city) => (
              <div
                key={city._id}
                className="w-full justify-center mx-auto flex h-42 overflow-hidden"
              >
                <Link
                  className="relative block bg-gray-900 group h-42 overflow-hidden rounded"
                  to={`/city/${city._id}`}
                >
                  <img
                    src={city.image}
                    alt={city.city}
                    className="rounded w-72 h-44 overflow-hidden group-hover:opacity-50 object-cover group-hover:scale-110 duration-300 ease-in-out"
                  />
                  <p className="absolute w-56 text-center text-2xl xl:text-3xl place-self-center top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all opacity-0 group-hover:opacity-100 group-hover:translate-y-0  text-white">
                    {city.city}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="container px-20 mx-auto mb-5">
        <h3 className="text-4xl md:text-5xl mt-10 mb-4 text-center text-zinc-700 headerFont">
          Categories
        </h3>
        <h3 className="text-2xl md:text-3xl mb-10 text-center text-zinc-500	headerFont">
          Or check <span className="text-[#be853f]">activities</span> to do!
        </h3>
        {categories.categories.length == 0 ? (
          <img
            src={gif}
            className="mx-auto"
            style={{ width: "250px", marginTop: "180px" }}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 m-auto">
            {categories.categories.map((cat) => (
              <div
                key={cat._id}
                className="w-full justify-center mx-auto flex h-42 overflow-hidden"
              >
                <Link
                  className="relative block bg-gray-900 group h-42 overflow-hidden rounded"
                  to={`/category/${cat._id}`}
                >
                  <img
                    src={cat.image}
                    alt={cat.type}
                    className="rounded w-72 h-44 overflow-hidden group-hover:opacity-50 object-cover group-hover:scale-110 duration-300 ease-in-out"
                  />
                  <p className="absolute w-56 text-center text-xl place-self-center top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all opacity-0 group-hover:opacity-100 group-hover:translate-y-0  text-white">
                    {cat.type}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
