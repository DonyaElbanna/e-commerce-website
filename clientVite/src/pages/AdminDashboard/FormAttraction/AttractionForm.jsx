import React, { useState } from "react";
import "./AttractionForm.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Joi from "joi";

const AttractionForm = () => {
  const { cities, categories, attractions } = useSelector((state) => state);

  const editedAttr = attractions.Attractions.filter(
    (attr) => attr._id == attractions.attractionEdit
  )[0];

  const [form, setForm] = useState({
    name: editedAttr ? editedAttr.name : "",
    duration: editedAttr ? editedAttr.duration : "",
    description: editedAttr ? editedAttr.description : "",
    category: editedAttr ? editedAttr.category._id : "",
    subcategory: editedAttr ? editedAttr.subcategory._id : "",
    status: editedAttr ? editedAttr.status : "",
    childAvailable:
      editedAttr && editedAttr.childAvailable == true
        ? "available"
        : editedAttr && editedAttr.childAvailable == false
        ? "notAvailable"
        : "",
    childAge: editedAttr ? editedAttr.childAge : "",
    ChildPrice: editedAttr ? editedAttr.ChildPrice : "",
    AdultPrice: editedAttr ? editedAttr.AdultPrice : "",
  });

  const [imageInputs, setImageInputs] = useState(
    editedAttr ? editedAttr.Images : [true]
  );
  const [imagesArr, setImagesArr] = useState(
    editedAttr ? editedAttr.Images : {}
  );
  const [imgErr, setImageErr] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // validating inputs
  const schema = Joi.object({
    name: Joi.string().required().min(3),
    duration: Joi.string().required(),
    description: Joi.string().required().min(1),
    category: Joi.string().required(),
    subcategory: Joi.string().required(),
    status: Joi.string().required(),
    childAvailable: Joi.string().required(),
    childAge: Joi.number().required().min(0),
    ChildPrice: Joi.number().required().min(0),
    AdultPrice: Joi.number().required().min(50),
  });

  const handleChange = (e) => {
    setErrors({});
    console.log(e.target.value);
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // console.log(imagesArr)
  const handleSubmit = (e) => {
    e.preventDefault();
    const err = schema.validate(form);
    const { error } = err;
    if (error) {
      const errorData = {};
      for (let item of error.details) {
        console.log(error.details);
        let key = item.path[0];
        let message = item.message;
        if (message === `"${key}" is not allowed to be empty`)
          message = `${key} is required `;
        else if (key == "image") {
          message = `${key}'s pattern is invalid `;
        }
        errorData[key] = message;
      }
      setErrors(errorData);
    } else {
      addAttraction();
      setErrors({});
    }
  };

  // sending data to server
  const addAttraction = async () => {
    // const errorData = {};

    if (Object.values(imagesArr) == 0) {
      // errorData.imageError = "at least 1 image is required";
      // setErrors(errorData);
      setImageErr("at least 1 image is required");
    } else {
      const newAttr = {
        name: form.name,
        duration: form.duration,
        description: form.description,
        category: form.category,
        subcategory: form.subcategory,
        status: form.status,
        childAvailable: form.childAvailable == "notAvailable" ? false : true,
        childAge: form.childAge,
        ChildPrice: Number(form.ChildPrice),
        AdultPrice: Number(form.AdultPrice),
        included: [
          "Air-Conditioned Vehicle for transportation",
          "Professional Tour Leader & Tour Guide",
          "Lunch meal will be provided at a local restaurant",
          "All Fees and Taxes",
        ],
        excluded: [
          "Any personal expenses or extra food and drinks during the trip",
          "Driver & Guide tipping - Not mandatory but highly appreciated",
          "Any other things not mentioned in the inclusions",
        ],
        Images: Object.values(imagesArr),
      };
      if (!editedAttr) {
        console.log("3");
        await axios
          .post("http://localhost:9999/attraction", newAttr)
          .then((response) => {
            navigate("/admin");
            console.log(response.data);
          })
          .catch((error) => {
            // setOpen(true);
            const errorData = {};
            console.log(error.response);
            if (!error.response) {
              errorData.globalErr =
                "something went wrong, please check your connection!";
            }

            setErrors(errorData);
          });
      } else {
        console.log("4");
        await axios
          .put(`http://localhost:9999/attraction/${editedAttr._id}`, newAttr)
          .then((response) => {
            console.log(response.data);
            navigate("/admin");
          })
          .catch((error) => {
            const errorData = {};
            console.log(error.response);
            if (!error.response) {
              errorData.globalErr =
                "something went wrong, please check your connection!";
            }
            setErrors(errorData);
          });
      }
    }
  };

  // adding img inputs
  const addInput = (e) => {
    const inputArr = [...imageInputs];

    let regex = /(http(s?):)|([/|.|w|s])*.(?:jpe?g|png)/;
    // console.log(e.target.parentElement.previousElementSibling.lastChild);
    const imgValue =
      e.target.parentElement.previousElementSibling.lastChild.value;
    const errorData = {};

    if (imgValue.match(regex)) {
      inputArr.push(true);
      setImageInputs(inputArr);
    } else {
      errorData.imageError = "pattern not match";
      setErrors(errorData);
    }
  };

  // validating img inputs and pushing them into an array
  const handleChangeImgs = (e) => {
    setErrors({});
    // console.log(e.target.getAttribute("id"));
    let regex = /(http(s?):)|([/|.|w|s])*.(?:jpe?g|png)/;
    if (e.target.value.match(regex)) {
      const obj = { ...imagesArr };

      setImagesArr({ ...obj, [e.target.getAttribute("id")]: e.target.value });
      setImageErr("");
    } else {
      const errorData = {};
      errorData.imageError = "pattern doesn't match";
      setErrors(errorData);
    }
  };

  return (
    <>
      <div className="py-16">
        <form
          className="w-11/12 md:w-9/12 lg:w-8/12 xl:w-6/12 m-auto p-10 rounded-xl shadow-lg shadow-[#be853f]"
          id="form"
        >
          <article className="grid grid-rows-12 grid-flow-col gap-5 lg:gap-10 text-center py-6">
            {/* name */}
            <div>
              <label htmlFor="name" className="text-[#be853f] font-semibold">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="block py-1 w-full  text-black border-x-neutral-500  bg-transparent  border-0 border-b-2  appearance-none  focus:outline-none focus:ring-0 focus:border-[#be853f] peer"
                placeholder="Tour name"
                required
                value={form.name}
                onChange={(value) => handleChange(value)}
              />
              <p className="text-red-500 text-xs italic">{errors.name}</p>
            </div>
            {/* duration */}
            <div>
              <label
                htmlFor="duration"
                className="text-[#be853f] font-semibold"
              >
                Duration
              </label>
              <input
                type="text"
                name="duration"
                id="duration"
                className="block py-1 w-full  text-black border-x-neutral-500  bg-transparent  border-0 border-b-2  appearance-none  focus:outline-none focus:ring-0 focus:border-[#be853f] peer"
                placeholder="Tour duration in days or hours"
                required
                value={form.duration}
                onChange={(value) => handleChange(value)}
              />
              <p className="text-red-500 text-xs italic">{errors.duration}</p>
            </div>
          </article>
          {/* desc */}
          <div className="my-5">
            <label
              htmlFor="description"
              className="text-[#be853f] font-semibold"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              placeholder="Enter tour's description"
              className="textarea rounded-none resize-none overflow-hidden w-full  text-black border-x-neutral-500  bg-transparent border-0 border-b-2 appearance-none  focus:outline-none focus:ring-0 focus:border-[#be853f] peer"
              value={form.description}
              onChange={(value) => handleChange(value)}
            ></textarea>
            <p className="text-red-500 text-xs italic">{errors.description}</p>
          </div>
          <article className="grid grid-rows-12 grid-flow-col gap-5 lg:gap-10 text-center py-6">
            <div>
              <label htmlFor="city" className="text-[#be853f] font-semibold">
                City
              </label>
              <select
                defaultValue={"DEFAULT"}
                id="city"
                required
                name="category"
                onChange={(value) => handleChange(value)}
                className="select text-slate-500 rounded-none  w-full pb-4  bg-transparent border-x-neutral-500  border-0 border-b-2 appearance-none  focus:outline-none focus:ring-0 focus:border-[#be853f] peer"
              >
                <option value="DEFAULT" disabled>
                  Enter City
                </option>
                {cities.cities?.map((cat) => (
                  <option
                    key={cat._id}
                    value={cat._id}
                    className="text-[#be853f]"
                  >
                    {cat.city}
                  </option>
                ))}
              </select>

              <p className="text-red-500 text-xs italic">{errors.category}</p>
            </div>

            <div>
              <label
                htmlFor="Category"
                className="text-[#be853f] font-semibold"
              >
                Category
              </label>
              <select
                defaultValue={"DEFAULT"}
                id="Category"
                required
                name="subcategory"
                onChange={(value) => handleChange(value)}
                className="select rounded-none  w-full pb-4 text-slate-500 bg-transparent border-x-neutral-500  border-0 border-b-2 appearance-none  focus:outline-none focus:ring-0 focus:border-[#be853f] peer"
              >
                <option value="DEFAULT" disabled>
                  Enter Category
                </option>
                {categories.categories.map((subcategory) => (
                  <option
                    key={subcategory._id}
                    value={subcategory._id}
                    className="text-[#be853f]"
                  >
                    {subcategory.type}
                  </option>
                ))}
              </select>

              <p className="text-red-500 text-xs italic">
                {errors.subcategory}
              </p>
            </div>
          </article>
          {/* status */}
          <article className="grid grid-rows-12 grid-flow-col  justify-around py-6">
            <div>
              <label htmlFor="status" className="text-[#be853f] font-semibold">
                Status
              </label>
              <div className="flex flex-col gap-4 my-4">
                <span>
                  <input
                    type="radio"
                    name="status"
                    id="status1"
                    value="available"
                    onChange={(value) => handleChange(value)}
                    className="text-[#be853f] radio-sm cursor-pointer border-2 border-solid bg-neutral-300 border-neutral-400/25"
                    checked={form.status === "available"}
                  />
                  <label
                    className="ml-2 text-slate-700 cursor-pointer"
                    htmlFor="status1"
                  >
                    Available
                  </label>
                </span>
                <span>
                  <input
                    type="radio"
                    name="status"
                    id="status2"
                    value="notAvailable"
                    onChange={(value) => handleChange(value)}
                    className="text-[#be853f] radio-sm cursor-pointer border-2 border-solid bg-neutral-300 border-neutral-400/25"
                    checked={form.status === "notAvailable"}
                  />
                  <label
                    className="ml-2 text-slate-700 cursor-pointer"
                    htmlFor="status2"
                  >
                    Not Available
                  </label>
                </span>
              </div>
              <p className="text-red-500 text-xs italic">{errors.status}</p>
            </div>
            <div>
              <label
                htmlFor="childAvailability"
                className="text-[#be853f] font-semibold"
              >
                Child Availability
              </label>
              <div className="flex flex-col gap-4 my-4">
                <span>
                  <input
                    type="radio"
                    name="childAvailable"
                    id="childAvailable1"
                    value="available"
                    onChange={(value) => handleChange(value)}
                    className="text-[#be853f] radio-sm cursor-pointer border-2 border-solid bg-neutral-300 border-neutral-400/25"
                    checked={form.childAvailable === "available"}
                  />
                  <label
                    className="ml-2 text-slate-700 cursor-pointer"
                    htmlFor="childAvailable1"
                  >
                    Available
                  </label>
                </span>
                <span>
                  <input
                    type="radio"
                    name="childAvailable"
                    id="childAvailable2"
                    value="notAvailable"
                    onChange={(value) => handleChange(value)}
                    className="text-[#be853f] radio-sm cursor-pointer border-2 border-solid bg-neutral-300 border-neutral-400/25"
                    checked={form.childAvailable === "notAvailable"}
                  />
                  <label
                    className="ml-2 text-slate-700 cursor-pointer"
                    htmlFor="childAvailable2"
                  >
                    Not Available
                  </label>
                </span>
              </div>
              <p className="text-red-500 text-xs italic">
                {errors.childAvailable}
              </p>
            </div>
          </article>
          {/* child age */}
          <article className="grid grid-rows-12 grid-flow-col gap-5 lg:gap-10 text-center py-6">
            <div>
              <label
                htmlFor="childAge"
                className="text-[#be853f] font-semibold"
              >
                Child Age
              </label>
              <input
                type="number"
                name="childAge"
                id="childAge"
                className="block py-1 w-full  text-black border-x-neutral-500  bg-transparent  border-0 border-b-2  appearance-none  focus:outline-none focus:ring-0 focus:border-[#be853f] peer"
                placeholder=" "
                required
                min="0"
                value={form.childAge}
                onChange={(value) => handleChange(value)}
              />
              <p className="text-red-500 text-xs italic">{errors.childAge}</p>
            </div>

            <div>
              <label
                htmlFor="ChildPrice"
                className="text-[#be853f] font-semibold"
              >
                Child Price
              </label>
              <input
                type="number"
                name="ChildPrice"
                id="ChildPrice"
                className="block py-1 w-full  text-black border-x-neutral-500  bg-transparent  border-0 border-b-2  appearance-none  focus:outline-none focus:ring-0 focus:border-[#be853f] peer"
                placeholder=" "
                required
                min="0"
                value={form.ChildPrice}
                onChange={(value) => handleChange(value)}
              />
              <p className="text-red-500 text-xs italic">{errors.ChildPrice}</p>
            </div>
            <div>
              <label
                htmlFor="AdultPrice"
                className="text-[#be853f] font-semibold"
              >
                Adult Price
              </label>
              <input
                type="number"
                name="AdultPrice"
                id="AdultPrice"
                className="block py-1 w-full  text-black border-x-neutral-500  bg-transparent  border-0 border-b-2  appearance-none  focus:outline-none focus:ring-0 focus:border-[#be853f] peer"
                placeholder=" "
                required
                min="0"
                value={form.AdultPrice}
                onChange={(value) => handleChange(value)}
              />
              <p className="text-red-500 text-xs italic">{errors.AdultPrice}</p>
            </div>
          </article>
          {/* images */}
          <article className="grid grid-rows-12 grid-flow-col gap-5 lg:gap-10 py-6 items-center">
            <div>
              <label htmlFor="image" className="text-[#be853f] font-semibold">
                Image
              </label>
              {imageInputs.map((img, i) => (
                <input
                  key={i}
                  type="text"
                  name="image"
                  id={`image${i}`}
                  className="block py-1 w-2/3  text-black border-x-neutral-500 mt-3 bg-transparent  border-0 border-b-2  appearance-none  focus:outline-none focus:ring-0 focus:border-[#be853f] peer"
                  placeholder="http://url.jpg"
                  required
                  value={imagesArr[i]}
                  onChange={(e) => handleChangeImgs(e)}
                />
              ))}
            </div>
            <div>
              <button
                type="button"
                className="text-white bg-gray-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                onClick={(e) => addInput(e)}
              >
                +
              </button>
              <p className="text-red-500 text-xs italic">
                {errors.imageError || imgErr}
              </p>
            </div>
          </article>
          <p className="text-red-500 text-xs italic">{errors.globalErr}</p>
          {/* submit */}
          <div className="text-center my-16">
            <button
              type="submit"
              className="text-white bg-gray-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AttractionForm;
