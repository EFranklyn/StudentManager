import { Route } from "react-router-dom";
import StudentLayout from "../layouts/student/studentLayout";
import StudentList from "../pages/student/studentList";


const studentRoutes = (
  <Route path="student" element={<StudentLayout />}>
    <Route path="list" element={<StudentList/>} />
  </Route>
);

export default studentRoutes;