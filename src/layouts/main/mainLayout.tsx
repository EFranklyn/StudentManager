import React from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "../../components/navBar/Navbar";

const MainLayout: React.FC = () => {
  return (
    <div>
      <NavbarComponent />
      <Outlet />
    </div>
  );
};

export default MainLayout;
