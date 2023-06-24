import "./App.css";
import LoginForm from "./components/common/AuthModal/LoginForm";
import RegisterForm from "./components/common/AuthModal/registerForm";
import { Route, Routes, useNavigate } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </>
  );
}

export default App;
