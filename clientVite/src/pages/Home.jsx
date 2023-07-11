import Welcome from "../components/HomeContainer/Welome/welcome";
import HighestRated from "../components/HomeContainer/HighestRated/HighestRated";
import Filter from "../components/HomeContainer/Filters/Filter";
import Grid from "@mui/material/Unstable_Grid2";
import CardsContainer from "../components/HomeContainer/Filters/CardsContainer";
import { useSelector } from "react-redux";
import Popular from "../components/Popular/Popular";
import Container from "@mui/material/Container";
import WhyChooseUs from "../components/HomeContainer/WhyChooseUs";

const Home = () => {
  const { attractions } = useSelector((state) => state);

  return (
    <>
      <Welcome />
      <Container>
        <Popular />
        <h1 className="headerFont text-center text-3xl mt-6 py-6">
          Filter your Tours
        </h1>
        <Grid container spacing={5}>
          <Grid xs={12} sm={4} md={3} sx={{ paddingTop: "0px" }}>
            <Filter />
          </Grid>
          <Grid xs={12} sm={8} md={9}>
            <CardsContainer />
          </Grid>
        </Grid>
      </Container>
      <WhyChooseUs />
      {/* <Filter />
        <HighestRated /> */}
    </>
  );
};

export default Home;
