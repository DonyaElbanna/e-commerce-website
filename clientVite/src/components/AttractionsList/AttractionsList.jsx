import React from "react";
import Categories from "../HomeContainer/Categories/Categories";
import Navbar from "../common/NavBar/Navbar";
import { useParams } from "react-router-dom";
import AttractionCard from "../HomeContainer/AttractionCard/AttractionCard";

const AttractionsList = () => {
  let { name } = useParams();
  return (
    <>
      <div className="container p-5 mx-auto">
        <h3 className="text-3xl text-center">{name}</h3>
        <Categories />
        <h3 className="text-3xl mb-8 text-center">Attractions List</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <AttractionCard />
          <AttractionCard />
          <AttractionCard />
          <AttractionCard />
        </div>
      </div>
    </>
  );
};

export default AttractionsList;
