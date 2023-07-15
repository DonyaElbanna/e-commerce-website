import Grid from "@mui/material/Unstable_Grid2";
import { useDispatch, useSelector } from "react-redux";
import CardItem from "../HomeContainer/Filters/Card";
import { useEffect, useState } from "react";
import { handleIsLoadingToggle } from "../../rtk/features/commonSlice";
import axios from "axios";
import gif from "../../assets/gih.gif";
const Popular = () => {
  const [highestRated, sethighestRated] = useState([]);
  const { common } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleIsLoadingToggle());
    const getHighest = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:9999/review/highest"
        );
        console.log(data);
        sethighestRated(data);
      } catch (error) {
        console.log(error);
      }
    };
    getHighest();
    dispatch(handleIsLoadingToggle());
  }, []);
  return (
    <>
      <div>
        <h1 className="text-4xl sm:text-5xl text-center mt-12 pb-8 text-zinc-700 headerFont">
          Our Most <span className="text-[#be853f]">Popular</span> Tours
        </h1>
        <Grid container spacing={3}>
          {!common.isLoading ? (
            highestRated?.slice(0, 8).map((attr) => (
              <Grid xs={12} sm={6} md={4} lg={3} key={attr._id}>
                <CardItem attr={attr} />
              </Grid>
            ))
          ) : (
            <img
              src={gif}
              alt="gif"
              className="mx-auto"
              style={{ width: "150px", marginTop: "120px" }}
            />
          )}
        </Grid>
      </div>
    </>
  );
};

export default Popular;
