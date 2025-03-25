import React from "react";
import { Outlet } from "react-router-dom";

const StudentLayout: React.FC = () => {
  return (
    <div>
      <h2>Área do Estudante</h2>
      <Outlet />
    </div>
  );
};

export default StudentLayout;