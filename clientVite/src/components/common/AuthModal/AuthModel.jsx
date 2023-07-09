import { useSelector } from "react-redux";
import ForgetPassword from "./ForgetPassword";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import UserForm from "../../../pages/AdminDashboard/Forms/UserForm";
import CityForm from "../../../pages/AdminDashboard/Forms/CityForm";
import CatForm from "../../../pages/AdminDashboard/Forms/CatForm";
import ResetPassword from "./ResetPassword";
import AddReview from "../../AttractionDetails/AddReview";
import OrderForm from "../../../pages/AdminDashboard/Forms/OrderForm";

const AuthModel = () => {
  const { auth } = useSelector((state) => state);
  return (
    <>
      {auth.authType === "login" && <LoginForm />}
      {auth.authType === "register" && <RegisterForm />}
      {auth.authType === "forget" && <ForgetPassword />}
      {auth.authType === "reset" && <ResetPassword />}
      {auth.authType === "addUser" && <UserForm />}
      {auth.authType === "addCity" && <CityForm />}
      {auth.authType === "addCat" && <CatForm />}
      {auth.authType === "review" && <AddReview />}
      {auth.authType === "addOrder" && <OrderForm />}
    </>
  );
};

export default AuthModel;
