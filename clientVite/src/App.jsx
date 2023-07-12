import "./App.css";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AttractionDetails from "./components/AttractionDetails/AttractionDetails";
import AttractionsList from "./components/AttractionsList/AttractionsList";
import Navbar1 from "./components/common/NavBar/Navbar1";
import Footer from "./components/common/Footer/Footer";
import Wishlist from "./pages/Wishlist";
import { useDispatch, useSelector } from "react-redux";
import Cities from "./components/Cities/Cities";
import CategoriesList from "./components/CategoriesList/CategoriesList";
import AboutUs from "./components/AboutUs/AboutUs";
import ContactUs from "./components/ContactUs/ContactUs";
import AuthModel from "./components/common/AuthModal/AuthModel";
import Admin from "./pages/AdminDashboard/Admin";
import ResetPassword from "./components/common/AuthModal/ResetPassword";
import { useEffect, useState } from "react";
import { handleAuthType, handleOpenAuthModal } from "./rtk/features/authSlice";
import axios from "axios";
import { AttractionGroupHandler } from "./rtk/features/attrSlice";
import Orders from "./pages/Orders";
import AttractionForm from "./pages/AdminDashboard/FormAttraction/AttractionForm";
import IconMap from "./components/Map/IconMap";
import { citiesHandler } from "./rtk/features/citiesSlice";
import { categoriesHandler } from "./rtk/features/categoriesSlice";
import Error from "./components/Error/Error";
import { Places } from "./components/places/Places";

function App() {
  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();
  const getAllAttract = async () => {
    try {
      const { data } = await axios.get("http://localhost:9999/attraction");
      dispatch(AttractionGroupHandler(data.AllAttraction));
    } catch (error) {
      console.log(error);
    }
  };
  const getAllCities = async () => {
    try {
      const { data } = await axios.get("http://localhost:9999/category");
      dispatch(citiesHandler(data.categories));
    } catch (error) {
      console.log(error);
    }
  };
  const getAllCats = async () => {
    try {
      const { data } = await axios.get("http://localhost:9999/subcat");
      dispatch(categoriesHandler(data.subcategories));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(handleAuthType("login"));
    dispatch(handleOpenAuthModal(false));
    getAllAttract();
    getAllCities();
    getAllCats();
  }, []);
  return (
    <>
      <Navbar1 />
      {auth.openAuthModal ? <AuthModel /> : ""}
      <div style={{ minHeight: "385px" }}>
        <Routes className="bg-black">
          <Route path="/" element={<Home />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/order" element={<Orders />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/map" element={<IconMap />} />
          <Route path="/map/:id" element={<Places />} />

          {/* <Route path="/AttractionDetails" element={<AttractionDetails />} /> */}

          <Route path="/cities" element={<Cities />} />
          <Route
            path="/admin"
            element={
              auth.userInfo.role === "admin" ? (
                <Admin />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/form"
            element={
              auth.userInfo.role === "admin" ? (
                <AttractionForm />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path="/city/:id" element={<AttractionsList />} />
          <Route path="/category/:id" element={<CategoriesList />} />
          <Route path="/city/:id/details" element={<AttractionDetails />} />

          <Route path="/*" element={<Error />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
