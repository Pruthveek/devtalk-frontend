import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Body";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import Feed from "./pages/Feed";
import Connections from "./pages/Connections";
import Requests from "./pages/Requests";
import Premium from "./pages/Premium";

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
              <Route path="connections" element={<Connections />} />
              <Route path="requests" element={<Requests />} />
              <Route path="premium" element={<Premium />} />  
              <Route path="*" element={<NotFound />} />

            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </Provider>
      
    </>
  );
}

export default App;
