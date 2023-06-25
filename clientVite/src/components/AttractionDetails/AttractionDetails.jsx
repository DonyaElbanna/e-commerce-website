import BookingCard from "./BookingCard";
import Details from "./Details";
import Slider from "./Slider";

const AttractionDetails = () => {
  return (
    <>
      <div className="w-3/4 m-auto mt-5">
        <Slider />

        <div className="container grid grid-cols-3 mt-3 px-3">
          <Details className="grid-cols-2" />
          <BookingCard className="col-span-1" />
        </div>
      </div>
    </>
  );
};

export default AttractionDetails;
