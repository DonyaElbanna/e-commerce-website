import { useSelector } from "react-redux";
import ForgetPassword from "./ForgetPassword";
import LoginForm from "./LoginForm";
import RegisterForm from "./registerForm";

const AuthModel = () => {
  const { auth } = useSelector((state) => state);
  return (
    <>
      {auth.authType === "login" && <LoginForm />}
      {auth.authType === "register" && <RegisterForm />}
      {auth.authType === "forget" && <ForgetPassword />}
      {auth.authType === "reset" && <ResetPassword />}
    </>
  );
};

export default AuthModel;
