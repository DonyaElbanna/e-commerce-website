import React, { useEffect, useState } from "react";
import style from "./AttractionForm.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AttractionForm = () => {
  const [cats, setCats] = useState([]);
  // const Navigate = useNavigate();
  const [catId, setCatId] = useState("");

  useEffect(() => {
    const getCats = async () => {
      const { data } = await axios.get("http://localhost:9999/category");
      // console.log(data);
      setCats(data.categories);
    };
    getCats();
  }, []);

  const getCatId = (tar) => {
    setCatId(tar);
  };

  const [subCat, setSubCat] = useState([]);
  // const NavigateSubCat = useNavigate();
  const [subCatId, setSubCatId] = useState("");
  useEffect(() => {
    const getSubCat = async () => {
      const { data } = await axios.get("http://localhost:9999/subcat");
      setSubCat(data.subcategories);
    };
    getSubCat();
  }, []);
  // useEffect(() => {
  //   console.log(subCatId);
  // }, [subCatId]);

  const getSubCatId = (id) => {
    setSubCatId(id);
  };
  return (
    <>
      <section className="py-16">
        <form
          className="w-11/12 md:w-9/12 lg:w-8/12 xl:w-6/12 m-auto p-10 rounded-xl shadow-lg shadow-[#be853f]"
          id="form"
        >
          <article className="grid grid-rows-12 grid-flow-col gap-5 lg:gap-10 text-center py-6">
            <div>
              <label htmlFor="name" className="text-[#be853f]">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="block py-1 w-full  text-black border-x-neutral-500  bg-transparent  border-0 border-b-2  appearance-none  focus:outline-none focus:ring-0 focus:border-[#be853f] peer"
                placeholder=" "
                required
              />
            </div>
            <div>
              <label htmlFor="duration" className="text-[#be853f]">
                Duration
              </label>
              <input
                type="number"
                name="duration"
                id="duration"
                className="block py-1 w-full  text-black border-x-neutral-500  bg-transparent  border-0 border-b-2  appearance-none  focus:outline-none focus:ring-0 focus:border-[#be853f] peer"
                placeholder=" "
                required
              />
            </div>
          </article>

          <div className="my-5">
            <label htmlFor="name" className="text-[#be853f]">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              placeholder=""
              className="textarea rounded-none resize-none overflow-hidden w-full  text-black border-x-neutral-500  bg-transparent border-0 border-b-2 appearance-none  focus:outline-none focus:ring-0 focus:border-[#be853f] peer"
            ></textarea>
          </div>
          <article className="grid grid-rows-12 grid-flow-col gap-5 lg:gap-10 text-center py-6">
            <div>
              <label htmlFor="cites" className="text-[#be853f]">
                City
              </label>

              <select
                id="Cites"
                onChange={(e) => getCatId(e.target.value)}
                className="select rounded-none  w-full pb-4 text-[#be853f] bg-transparent border-x-neutral-500  border-0 border-b-2 appearance-none  focus:outline-none focus:ring-0 focus:border-[#be853f] peer"
              >
                <option disabled selected>
                  ...
                </option>
                {cats.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.city}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="Catogriy" className="text-[#be853f]">
                Catogriy
              </label>

              <select
                id="Catogriy"
                onChange={(e) => getSubCatId(e.target.value)}
                className="select rounded-none  w-full pb-4 text-[#be853f] bg-transparent border-x-neutral-500  border-0 border-b-2 appearance-none  focus:outline-none focus:ring-0 focus:border-[#be853f] peer"
              >
                <option disabled selected>
                  ...
                </option>
                {subCat.map((subcategory) => (
                  <option key={subcategory._id} value={subcategory._id}>
                    {subcategory.type}
                  </option>
                ))}
              </select>
            </div>
          </article>

          <article className="grid grid-rows-12 grid-flow-col  justify-between py-6">
            <div>
              <label htmlFor="status" className="text-[#be853f]">
                Status
              </label>
              <div className="flex flex-col gap-4 my-4">
                <span>
                  <input
                    type="radio"
                    name="status"
                    id="status"
                    className="text-[#be853f] radio-sm border-0"
                  />
                  <strong className="ml-2">avalibale</strong>
                </span>
                <span>
                  <input
                    type="radio"
                    name="status"
                    id="status"
                    className="text-[#be853f] radio-sm border-0"
                  />
                  <strong className="ml-2">unavalibale</strong>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="childAvailability" className="text-[#be853f]">
                Child Availability
              </label>
              <div className="flex flex-col gap-4 my-4">
                <span>
                  <input
                    type="radio"
                    name="childAvailability"
                    id="childAvailability"
                    className="text-[#be853f] radio-sm border-0"
                  />
                  <strong className="ml-2">avalibale</strong>
                </span>
                <span>
                  <input
                    type="radio"
                    name="childAvailability"
                    id="childAvailability"
                    className="text-[#be853f] radio-sm border-0"
                  />
                  <strong className="ml-2">unavalibale</strong>
                </span>
              </div>
            </div>
          </article>

          <article className="grid grid-rows-12 grid-flow-col gap-5 lg:gap-10 text-center py-6">
            <div>
              <label htmlFor="childAge" className="text-[#be853f]">
                Child Age
              </label>
              <input
                type="number"
                name="childAge"
                id="childAge"
                className="block py-1 w-full  text-black border-x-neutral-500  bg-transparent  border-0 border-b-2  appearance-none  focus:outline-none focus:ring-0 focus:border-[#be853f] peer"
                placeholder=" "
                required
              />
            </div>
            <div>
              <label htmlFor="childPrice" className="text-[#be853f]">
                Child Price
              </label>
              <input
                type="number"
                name="childPrice"
                id="childPrice"
                className="block py-1 w-full  text-black border-x-neutral-500  bg-transparent  border-0 border-b-2  appearance-none  focus:outline-none focus:ring-0 focus:border-[#be853f] peer"
                placeholder=" "
                required
              />
            </div>
            <div>
              <label htmlFor="adultPrice" className="text-[#be853f]">
                Adult Price
              </label>
              <input
                type="number"
                name="adultPrice"
                id="adultPrice"
                className="block py-1 w-full  text-black border-x-neutral-500  bg-transparent  border-0 border-b-2  appearance-none  focus:outline-none focus:ring-0 focus:border-[#be853f] peer"
                placeholder=" "
                required
              />
            </div>
          </article>
          <div className="text-center my-16">
            <button
              type="submit"
              className="text-white bg-gray-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AttractionForm;
