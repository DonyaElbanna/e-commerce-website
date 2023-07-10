import { useState, useEffect } from "react";
import axios from "axios";
import BookingCard from "./BookingCard";
import Details from "./Details";
import Slider from "./Slider";
import { useParams } from "react-router-dom";
import gif from "../../assets/gih.gif";
import { useDispatch, useSelector } from "react-redux";

import ImagesSlider from "./ImagesSlider";
import { AttractionDetailsHandlerById } from "../../rtk/features/attrSlice";
import BookingModal from "../common/BookingModal/BookingModal";
import { reviewHandler } from "../../rtk/features/reviewSlice";

const AttractionDetails = () => {
  const { id } = useParams();
  // console.log(id)
  const [attrDetails, setAttrDetails] = useState([]);
  const { attractions } = useSelector((state) => state);
  const dispatch = useDispatch();
  const getAttrs = async () => {
    const { data } = await axios.get(`http://localhost:9999/attraction/${id}`);

    setAttrDetails(data.Attraction);
    dispatch(reviewHandler(data.Attraction.reviews[0]));
  };

  useEffect(() => {
    dispatch(AttractionDetailsHandlerById(id));
    getAttrs();
  }, []);

  return (
    <>
      {attrDetails.length == 0 ? (
        <img
          src={gif}
          className=" mx-auto"
          style={{ width: "250px", marginTop: "180px" }}
        />
      ) : (
        <div className="container px-3 mx-auto my-5">
          <h2 className="text-4xl mb-10 text-center	text-zinc-700 ">
            {attrDetails.name}
          </h2>
          <div className="w-3/4 m-auto mt-5 ">
            {/* <ImagesSlider attrDetails={attrDetails} /> */}
            <Slider attrDetails={attrDetails} />

            <div className="flex w-full justify-between flex-col-reverse  md:flex-row  mt-4 gap-4">
              <Details attrDetails={attrDetails} />
              <BookingCard attrDetails={attrDetails} />
              <BookingModal />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AttractionDetails;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import BookingCard from "./BookingCard";
// import Details from "./Details";
// import Slider from "./Slider";
// import { useParams } from "react-router-dom";
// import gif from "../../assets/gih.gif";
// import { useDispatch, useSelector } from "react-redux";

// import ImagesSlider from "./ImagesSlider";
// import { AttractionDetailsHandlerById } from "../../rtk/features/attrSlice";

// const AttractionDetails = () => {
//   const { id } = useParams();
//   // console.log(id)
//   const [attrDetails, setAttrDetails] = useState([]);
//   const { attractions } = useSelector((state) => state);
//   const dispatch = useDispatch();
//   const getAttrs = async () => {
//     const { data } = await axios.get(`http://localhost:9999/attraction/${id}`);
//     // console.log(data.Attraction);
//     setAttrDetails(data.Attraction);
//   };

//   useEffect(() => {
//     dispatch(AttractionDetailsHandlerById(id));
//     getAttrs();
//   }, []);

//   return (
//     <>
//       {attrDetails.length == 0 ? (
//         <img src={gif} className=" mx-auto" style={{ width: "250px", marginTop:'180px' }} />
//       ) : (
//         <div className="container px-5 mx-auto">
//           <h2 className="text-4xl mb-10 text-center	">{attrDetails.name}</h2>
//           <div className="w-3/4 m-auto mt-5 ">
//             {/* <ImagesSlider attrDetails={attrDetails} /> */}
//             <Slider attrDetails={attrDetails} />

//             <div className="flex w-full justify-between flex-col-reverse md:flex-row  mt-3 px-3 gap-4">
//               <Details attrDetails={attrDetails} />
//               <BookingCard attrDetails={attrDetails} />
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AttractionDetails;
