import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Body";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import Feed from "./pages/Feed";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </Provider>
      
    </>
  );
}

export default App;
