import { BrowserRouter, Routes, Route } from "react-router-dom";
import Directory from "../pages/directory";
import { PublicRouteLayout } from "../components";
import ProfilePage from "../pages/profilePage";

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Directory />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
