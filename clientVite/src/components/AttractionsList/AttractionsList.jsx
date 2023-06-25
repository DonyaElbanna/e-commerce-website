import React, { useState, useEffect } from "react";
import Categories from "../HomeContainer/Categories/Categories";
import Navbar from "../common/NavBar/Navbar";
import { useParams } from "react-router-dom";
import AttractionCard from "../HomeContainer/AttractionCard/AttractionCard";
import axios from "axios";

const AttractionsList = () => {
  const [attrs, setAttrs] = useState([]);
  const [cityName, setCityName] = useState("");
  const [filteredAttrs, setFilteredAttrs] = useState([]);
  const [filterID, setFilterID] = useState("");

  let { id } = useParams();
  // console.log(id);

  useEffect(() => {
    const getCityName = async () => {
      const { data } = await axios.get(`http://localhost:9999/category/${id}`);
      // console.log(data.category.city);
      setCityName(data.category.city);
    };

    const getAttrs = async () => {
      const { data } = await axios.get(
        `http://localhost:9999/attraction/category/${id}`
      );
      // console.log(data.Attractions);
      setAttrs(data.Attractions);
    };

    getCityName();
    getAttrs();
  }, []);

  // console.log(attrs);

  const handleFilter = (id) => {
    setFilterID(id);
    const attrsCopy = [...attrs];
    const filteredattrs = attrsCopy.filter(
      (attr) => attr.subcategory._id == id
    );
    console.log(id, filteredattrs);
    setFilteredAttrs(filteredattrs);
  };
  return (
    <>
      <div className="container p-5 mx-auto">
        <h3 className="text-3xl text-center">{cityName}</h3>
        <Categories handleFilter={handleFilter} />
        <h3 className="text-3xl mb-8 text-center">Tours</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {!filterID ? (
            attrs.length == 0 ? (
              <p>Nothing</p>
            ) : (
              attrs.map((attr) => <AttractionCard key={attr._id} attr={attr} />)
            )
          ) : filteredAttrs.length == 0 ? (
            <p>Nothing</p>
          ) : (
            filteredAttrs.map((attr) => (
              <AttractionCard key={attr._id} attr={attr} />
            ))
          )}
          {}
        </div>
      </div>
    </>
  );
};

export default AttractionsList;
