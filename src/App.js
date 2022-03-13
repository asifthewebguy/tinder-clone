import Home from "./pages/Home";
import OnBoarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";

import { Routes, Route, BrowserRouter } from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/boarding"} element={<OnBoarding />} />
        <Route path={"/dashboard"} element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
