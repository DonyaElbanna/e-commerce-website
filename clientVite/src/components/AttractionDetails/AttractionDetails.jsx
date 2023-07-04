import { useState, useEffect } from "react";
import axios from "axios";
import BookingCard from "./BookingCard";
import Details from "./Details";
import Slider from "./Slider";
import { useParams } from "react-router-dom";
import gif from "../../assets/gih.gif";

import ImagesSlider from "./ImagesSlider";

const AttractionDetails = () => {
  let { id } = useParams();
  const [attrDetails, setAttrDetails] = useState([]);

  useEffect(() => {
    const getAttrs = async () => {
      const { data } = await axios.get(
        `http://localhost:9999/attraction/${id}`
      );
      // console.log(data.Attraction);
      setAttrDetails(data.Attraction);
    };
    getAttrs();
  }, []);

  return (
    <>
      {attrDetails.length == 0 ? (
        <img src={gif} className=" mx-auto" style={{ width: "150px" }} />
      ) : (
        <div className="container px-5 mx-auto">
          <h2 className="text-4xl mb-10 text-center	">{attrDetails.name}</h2>
          <div className="w-3/4 m-auto mt-5 ">
            {/* <ImagesSlider attrDetails={attrDetails} /> */}
            <Slider attrDetails={attrDetails} />

            <div className="flex w-full justify-between flex-col-reverse md:flex-row  mt-3 px-3 gap-4">
              <Details attrDetails={attrDetails} />
              <BookingCard attrDetails={attrDetails} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AttractionDetails;
