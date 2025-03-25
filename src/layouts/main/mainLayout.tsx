import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  return (
    <div>
      <h1>Meu App</h1>
      <Outlet />
    </div>
  );
};

export default MainLayout;