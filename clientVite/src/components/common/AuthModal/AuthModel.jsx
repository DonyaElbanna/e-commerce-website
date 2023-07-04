import { useSelector } from "react-redux";
import ForgetPassword from "./ForgetPassword";
import LoginForm from "./LoginForm";
import RegisterForm from "./registerForm";
import ResetPassword from "./ResetPassword";
import AddReview from "../../AttractionDetails/AddReview";

const AuthModel = () => {
  const { auth } = useSelector((state) => state);
  return (
    <>
      {auth.authType === "login" && <LoginForm />}
      {auth.authType === "register" && <RegisterForm />}
      {auth.authType === "forget" && <ForgetPassword />}
      {auth.authType === "reset" && <ResetPassword />}
      {auth.authType === "review" && <AddReview />}
    </>
  );
};

export default AuthModel;
