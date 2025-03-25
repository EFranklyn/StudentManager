import React from "react";
import { Route } from "react-router-dom";
import StudentLayout from "../layouts/student/studentLayout";


const studentRoutes = (
  <Route path="student" element={<StudentLayout />}>
    <Route path="list" element={<div>Lista de Estudantes</div>} />
  </Route>
);

export default studentRoutes;