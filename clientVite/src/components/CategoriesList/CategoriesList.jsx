import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AttractionCard from "../HomeContainer/AttractionCard/AttractionCard";
import {
  handleAuthType,
  handleToggleAuthModal,
} from "../../rtk/features/authSlice";

const CategoriesList = () => {
  let { id } = useParams();
  const { attractions } = useSelector((state) => state);

  const catAttrs = attractions.Attractions.filter(
    (attr) => attr.subcategory._id == id
  );

  const groupedData = catAttrs.reduce((groups, item) => {
    const city = item.category.city;
    if (!groups[city]) {
      groups[city] = [];
    }
    groups[city].push(item);
    return groups;
  }, {});

  return (
    <>
      <div>
        {Object.keys(groupedData).map((city, i) => (
          <div className="container p-5 mx-auto" key={i}>
            <h3 className="text-4xl text-center text-zinc-700 headerFont">
              {city}
            </h3>
            <div className="flex flex-warp justify-center">
              {groupedData[city].map((attr) => (
                <AttractionCard key={attr._id} attr={attr} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoriesList;
