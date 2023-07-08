import React from "react";
import { Link } from "react-router-dom";
import gif from "../../assets/gih.gif";
import { useSelector } from "react-redux";

const Categories = () => {
  const { cities } = useSelector((state) => state);

  return (
    <div className="container px-5 mx-auto mb-5">
      <h3 className="text-4xl mb-10 text-center	">Cities</h3>
      {cities.cities.length == 0 ? (
        <img src={gif} className="mx-auto" style={{ width: "150px" }} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-auto">
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
                <p className="absolute w-56 text-center place-self-center top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all opacity-0 group-hover:opacity-100 group-hover:translate-y-0 text-3xl text-white">
                  {city.city}
                </p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
