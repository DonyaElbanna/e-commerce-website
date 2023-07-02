import React, { useEffect, useState } from "react";
import axios from "axios";
import AttractionCard from "../AttractionCard/AttractionCard";

const HighestRated = () => {
  const [packages, setPackages] = useState([]);
  const [rating, setRating] = useState();

  const id = 5;
  useEffect(() => {
    const getPackages = async () => {
      const { data } = await axios.get(`http://localhost:9999/review/highest`);
      //   setPackages(data.map((item) => item.attraction[0]));
      //   setRating(data.map((item) => item.avgRating));
      // console.log(data);
      setPackages(data);
    };

    getPackages();
  }, []);
  //   console.log(packages);
  //   console.log(packages.map(pkg=>[pkg.attraction[0], pkg.avgRating]));
  //   console.log(rating)
  return (
    <>
      <div className="container p-5 mx-auto">
        <h3 className="text-3xl text-center">Highest Rated packages</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {packages.map((pkg, i) => (
            <AttractionCard key={i} attr={pkg} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HighestRated;
