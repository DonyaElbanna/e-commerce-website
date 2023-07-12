import Grid from "@mui/material/Unstable_Grid2";
import { useSelector } from "react-redux";
import CardItem from "../HomeContainer/Filters/Card";

const Popular = () => {
  const { attractions } = useSelector((state) => state);

  return (
    <>
      <div>
        <h1 className="text-4xl sm:text-5xl text-center mt-12 pb-8 text-zinc-700 headerFont">
          Our Most <span className="text-[#be853f]">Popular</span> Tours
        </h1>
        <Grid container spacing={3}>
          {attractions.highestRated.slice(0, 6).map((attr) => (
            <Grid xs={12} sm={6} md={4} lg={3} key={attr._id}>
              <CardItem attr={attr} />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default Popular;
