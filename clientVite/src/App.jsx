import "./App.css";
import LoginForm from "./components/common/AuthModal/LoginForm";
import RegisterForm from "./components/common/AuthModal/registerForm";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import AttractionDetails from "./components/AttractionDetails/AttractionDetails";
import AttractionsList from "./components/AttractionsList/AttractionsList";
import Navbar from "./components/common/NavBar/Navbar";
import Footer from "./components/common/Footer/Footer";
import Wishlist from "./pages/Wishlist";
import Welcome from './components/Welome/welcome';
function App() {
  return (
    <>
      <Navbar />
      <Welcome />
      <Routes className="bg-black">
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/wishlist" element={<Wishlist />} />
        {/* <Route path="/AttractionDetails" element={<AttractionDetails />} /> */}
        <Route path="/city/:id" element={<AttractionsList />} />
        <Route path="/city/:id/details" element={<AttractionDetails />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
