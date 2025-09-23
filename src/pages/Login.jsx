import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/constants";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const handleLogin = async () => {
    try {
      if (email === "" || password === "") {
        toast.error("Please enter all fields.");
      } else {
        const res = await axios.post(
          BASE_URL + "/login",
          {
            email,
            password,
          },
          { withCredentials: true }
        );
        toast.success("You logged in sucessfully.");
        dispatch(addUser(res.data));
        return navigation("/");
      }
    } catch (err) {
      toast.error("Invalid credentials");
    }
  };
  return (
    <div className=" h-screen flex justify-center items-center">
      <div className="card bg-base-500 w-96 shadow-2xl shadow-black">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email Id</legend>
            <input
              type="email"
              className="input"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              className="input"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </fieldset>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
          <Link to={"/register"} className="text-blue-700">
            Create a new account.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
