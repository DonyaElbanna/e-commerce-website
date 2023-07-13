import Grid from "@mui/material/Unstable_Grid2";
import { useSelector } from "react-redux";
import CardItem from "./Card";

const CardsContainer = () => {
  const { attractions } = useSelector((state) => state);
  console.log(attractions);

  return (
    <>
      <Grid container spacing={3}>
        {!attractions.filters &&
          attractions.highestRated.slice(6).map((attr) => (
            <Grid xs={12} md={6} lg={4} key={attr._id}>
              <CardItem attr={attr} />
            </Grid>
          ))}
        {attractions.filters &&
          attractions.filters.city &&
          attractions.filteredCityAttrs.map((attr) => (
            <Grid xs={12} md={6} lg={4} key={attr._id}>
              <CardItem attr={attr} />
            </Grid>
          ))}
        {attractions.filters &&
          attractions.filters.category &&
          attractions.filteredCatAttrs.map((attr) => (
            <Grid xs={12} md={6} lg={4} key={attr._id}>
              <CardItem attr={attr} />
            </Grid>
          ))}
        {attractions.filters &&
          attractions.filters.prices &&
          attractions.filteredPriceAttrs.map((attr) => (
            <Grid xs={12} md={6} lg={4} key={attr._id}>
              <CardItem attr={attr} />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default CardsContainer;
