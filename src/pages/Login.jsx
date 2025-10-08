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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
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
  const handleSignUp = async () => {
    try {
      if (
        firstName === "" ||
        lastName === "" ||
        email === "" ||
        password === ""
      ) {
        toast.error("Please enter all fields.");
      } else {
        const res = await axios.post(
          BASE_URL + "/signin",
          { firstName, lastName, email, password },
          { withCredentials: true }
        );
        if(!res){
          toString.error("Invalid credentials")
        }
        dispatch(addUser(res?.data?.data));
        navigation("/profile");
      }
    } catch (err) {
      const msg = err.response.data.error || "Something went wrong";
      toast.error(msg);
      console.log(err.response.data.error);
    }
  };
  return (
    <div className=" h-screen flex justify-center items-center">
      <div className="card bg-base-500 w-96 shadow-2xl shadow-black">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          {!isLoginForm ? (
            <>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  className="input"
                  required
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  className="input"
                  required
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </fieldset>
            </>
          ) : (
            ""
          )}
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
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? <>Login</> : <>Sign Up</>}
            </button>
          </div>
          <p
            onClick={() => setIsLoginForm((value) => !value)}
            className="text-blue-700 cursor-pointer"
          >
            {isLoginForm ? (
              <>Create a new account.</>
            ) : (
              <>Existing user? Then login.</>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
