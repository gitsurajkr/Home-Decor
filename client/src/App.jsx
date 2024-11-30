import "./App.css";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SigninPage from "./Page/SigninPage";
import SignupPage from "./Page/SignupPage";
import LandingPage from "./Page/LandingPage";
import ProductPage from "./Page/ProductPage";
import ForgetPass from "./Page/Forget-Pass";
import Changepassword from "./Page/Change-Password";
import { Routes, Route } from "react-router-dom";
import { setMeData } from "./redux/userSlice";
import { getCookie } from "cookies-next";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserLogin = async () => {
      const token = getCookie("token");
      if (token) {
        try {
          const response = await axios.get(
            `http://localhost:3737/api/user/get-user`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response?.data?.data) {
            dispatch(setMeData(response.data.data));
            console.log(response.data.data);
          }
        } catch (error) {
          console.error("User validation failed", error);
        }
      }
    };

    checkUserLogin();
  }, [dispatch]);

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/reset-password" element={<ForgetPass />} />
        <Route path="/update-password/:userId" element={<Changepassword />} />
        <Route path="/product-page" element={<ProductPage />} />
      </Routes>
    </>
  );
}

export default App;
