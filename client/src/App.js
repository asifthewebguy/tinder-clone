import Home from "./pages/Home";
import OnBoarding from "./pages/OnBoarding";
import Dashboard from "./pages/Dashboard";
import { useCookies } from "react-cookie";

import { Routes, Route, BrowserRouter } from "react-router-dom";
const App = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const authToken = cookies.AuthToken;
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        {authToken && <Route path={"/boarding"} element={<OnBoarding />} />}
        {authToken && <Route path={"/dashboard"} element={<Dashboard />} />}

        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
