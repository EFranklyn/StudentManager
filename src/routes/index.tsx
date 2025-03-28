import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/main/mainLayout";
import studentRoutes from "./student";



const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<div>Home</div>} />
          {studentRoutes}
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;