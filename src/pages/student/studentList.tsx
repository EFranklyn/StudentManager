import React from "react";
import StudentCard from "../../components/student/studentCard";


const mockStudents = [
  { name: "Ana Souza", birthDate: "15/06/2000", state: "SP", city: "São Paulo", email: "ana@email.com" },
  { name: "Carlos Oliveira", birthDate: "22/09/1998", state: "RJ", city: "Rio de Janeiro", email: "carlos@email.com" },
  { name: "Fernanda Lima", birthDate: "10/12/2001", state: "MG", city: "Belo Horizonte", email: "fernanda@email.com" },
  { name: "Fernanda Lima", birthDate: "10/12/2001", state: "MG", city: "Belo Horizonte", email: "fernanda@email.com" },
  { name: "Fernanda Lima", birthDate: "10/12/2001", state: "MG", city: "Belo Horizonte", email: "fernanda@email.com" },
];

const StudentList: React.FC = () => {
  return (
    <div className="container mt-4">
      <h2>Lista de Estudantes</h2>
      <div className="row">
        {mockStudents.map((student, index) => (
          <div className="col-md-4" key={index}>
            <StudentCard {...student} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;