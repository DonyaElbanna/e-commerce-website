import "./App.css";
import LoginForm from "./components/common/AuthModal/LoginForm";
import RegisterForm from "./components/common/AuthModal/registerForm";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import AttractionDetails from "./components/AttractionDetails/AttractionDetails";
import AttractionsList from "./components/AttractionsList/AttractionsList";
import Navbar1 from "./components/common/NavBar/Navbar1";
import Footer from "./components/common/Footer/Footer";
import Wishlist from "./pages/Wishlist";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAuthType,
  handleIsLoggedIntoggle,
  handleOpenAuthModal,
  handleUserInfo,
} from "./rtk/features/authSlice";
import Cities from "./components/Cities/Cities";
import ForgetPassword from "./components/common/AuthModal/ForgetPassword";
import AuthModel from "./components/common/AuthModal/AuthModel";
import Admin from "./pages/AdminDashboard/Admin";
import ResetPassword from "./components/common/AuthModal/ResetPassword";
import { useEffect } from "react";
import Error from "./components/Error/Error";

function App() {
  const { auth } = useSelector((state) => state);

  return (
    <>
      <Navbar1 />
      {auth.openAuthModal ? <AuthModel /> : ""}
      <Routes className="bg-black">
        <Route path="/" element={<Home />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/reset" element={<ResetPassword />} />

        {/* <Route path="/AttractionDetails" element={<AttractionDetails />} /> */}
        <Route path="/cities" element={<Cities />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/city/:id" element={<AttractionsList />} />
        <Route path="/city/:id/details" element={<AttractionDetails />} />
        <Route path="/*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
