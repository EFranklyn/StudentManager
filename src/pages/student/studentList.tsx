import React, { useRef } from "react";
import StudentCard from "../../components/student/studentCard";
import { StudentModel } from "../../models/student.model";
import useCustomModal from "../../hooks/useCustomModal";
import StudentRegister from "../../components/modals/StudentRegister";
import { plainToInstance } from "class-transformer";


const StudentList: React.FC = () => {
  
  const { openCustomModal } = useCustomModal();
  const studentRef = useRef<StudentModel[]>([]);


  const setStudent = (student:unknown) => {
    const updatedData = plainToInstance(StudentModel, student)
    if(updatedData)
    studentRef.current.push(updatedData)
  }

  const openEditUserModal = async () => {
    const newStudent = new StudentModel()
    await openCustomModal({
      component: StudentRegister,
      componentProps: { data: newStudent, 
        onConfirm: (updatedData) => {
          setStudent(updatedData);
        },
      },
    });
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Estudantes</h2>
      <button className="btn btn-primary" onClick={openEditUserModal} data-bs-toggle="modal" data-bs-target="#exampleModal">
        cadastrar estudante 
      </button>
      <div className="row">
        {studentRef.current.map((student, index) => (
          <div className="col-md-4" key={index}>
            <StudentCard {...student} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;