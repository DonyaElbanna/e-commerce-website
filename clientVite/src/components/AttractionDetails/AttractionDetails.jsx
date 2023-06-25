import BookingCard from "./BookingCard";
import Details from "./Details";
import Slider from "./Slider";

const AttractionDetails = () => {
  return (
    <>
      <div className="w-3/4 m-auto mt-5 ">
        <Slider />

<<<<<<< HEAD
        <div className="container grid grid-cols-3 mt-3 px-3">
          <Details className="grid-cols-2" />
          <BookingCard className="col-span-1" />
=======
        <div className="flex w-full justify-between flex-col-reverse md:flex-row  mt-3 px-3 gap-4">
          <Details />
          <BookingCard />
>>>>>>> af524c088893297cd0f016f69c7270a9f151bff5
        </div>
      </div>
    </>
  );
};

export default AttractionDetails;
