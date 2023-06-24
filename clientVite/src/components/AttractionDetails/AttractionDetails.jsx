import BookingCard from "./BookingCard";
import Details from "./Details";
import Slider from "./Slider";

const AttractionDetails = () => {
  return (
    <>
      <div className="w-3/4 m-auto mt-5">
        <Slider />

        <div className="flex justify-between  mt-3 px-3">
          <Details />
          <BookingCard />
        </div>
      </div>
    </>
  );
};

export default AttractionDetails;
