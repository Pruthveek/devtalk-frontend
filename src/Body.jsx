import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { addUser } from "./utils/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if(userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.response && err.response.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  };
  useEffect(() => {
      fetchUser();
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Body;
