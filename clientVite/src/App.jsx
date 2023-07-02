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
import { handleIsLoggedIntoggle } from "./rtk/features/authSlice";
import Cities from "./components/Cities/Cities";
import ForgetPassword from "./components/common/AuthModal/ForgetPassword";

function App() {
  const { auth } = useSelector((state) => state);
  const dispahch = useDispatch();
  const handlerExp = () => {
    dispahch(handleIsLoggedIntoggle());
  };

  return (
    <>
      <Navbar1 />
      <Routes className="bg-black">
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forget" element={<ForgetPassword />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/wishlist" element={<Wishlist />} />
        {/* <Route path="/AttractionDetails" element={<AttractionDetails />} /> */}
        <Route path="/cities" element={<Cities />} />
        <Route path="/city/:id" element={<AttractionsList />} />
        <Route path="/city/:id/details" element={<AttractionDetails />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
