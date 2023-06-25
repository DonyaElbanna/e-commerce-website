import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Categories = () => {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const { data } = await axios.get("http://localhost:9999/category");
      // console.log(data);
      setCats(data.categories);
    };
    getCats();
  }, []);
  // console.log(cats);

  return (
    <div className="container px-5 mx-auto">
      <h2 className="text-4xl mb-10 text-center	">Cities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cats.map((cat, index) => (
          <div key={cat._id} className="flex h-48 overflow-hidden">
            <Link
              className="relative block bg-gray-900 group h-28 "
              to={`/city/${cat._id}`}
            >
              <img
                src={cat.image}
                alt={cat.city}
                className="rounded w-72 h-44 group-hover:opacity-50 object-cover group-hover:scale-110 transition duration-300 ease-in-out"
              />
              <p className="absolute place-self-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all opacity-0 group-hover:opacity-100 group-hover:translate-y-0 text-3xl text-white">
                {cat.city}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
