import BookingCard from "./BookingCard";
import Details from "./Details";
import Slider from "./Slider";

const AttractionDetails = () => {
  return (
    <>
      <div className="w-3/4 m-auto mt-5 ">
        <Slider />

        <div className="flex w-full justify-between flex-col-reverse md:flex-row  mt-3 px-3 gap-4">
          <Details />
          <BookingCard />
        </div>
      </div>
    </>
  );
};

export default AttractionDetails;
