import Footer from "../components/common/Footer/Footer";
import Navbar from "../components/common/NavBar/Navbar";
import AttractionCard from "../components/HomeContainer/AttractionCard/AttractionCard";
import Categories from "../components/HomeContainer/Categories/Categories";
import Cities from "../components/HomeContainer/Cities/Cities";

const Home = () => {
  return (
    <>
      <Cities />
      <AttractionCard />
    </>
  );
};

export default Home;
