import React from "react";

interface StudentCardProps {
  name: string;
  birthDate: string;
  state: string;
  city: string;
  email: string;
}

const StudentCard: React.FC<StudentCardProps> = ({ name, birthDate, state, city, email }) => {
  return (
    <div className="card m-2" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{city}, {state}</h6>
        <p className="card-text">Data de Nascimento: {birthDate}</p>
        <p className="card-text">Email: {email}</p>
      </div>
    </div>
  );
};

export default StudentCard;