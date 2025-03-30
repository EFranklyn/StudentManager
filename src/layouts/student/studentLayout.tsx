import React from "react";
import { Outlet } from "react-router-dom";

const StudentLayout: React.FC = () => {
  return (
    <div>
      <header className="bg-orange text-white p-4 mb-4 bg-success rounded"
      >
        <h1 className="text-center">Área do Estudante</h1>
        <p className="text-center">Gerencie os dados dos estudantes de forma fácil e eficiente.</p>
      </header>
      <Outlet />
    </div>
  );
};

export default StudentLayout;