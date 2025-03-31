import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/main/mainLayout";
import studentRoutes from "./student";
import ProjectIntroduction from "../pages/ProjectIntrodution";



const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="presentation" />} />
        <Route path="presentation" element={<ProjectIntroduction />} />
          {studentRoutes}
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;