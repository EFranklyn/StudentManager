import React, { useEffect, useRef, useState } from "react";
import StudentCard from "../../components/student/studentCard";
import { StudentModel } from "../../models/student.model";
import useCustomModal from "../../hooks/useCustomModal";
import StudentRegister from "../../components/modals/StudentRegister";
import { plainToInstance } from "class-transformer";
import useStudentApi from "../../services/useStudent";


const StudentList: React.FC = () => {

    
    const { openCustomModal } = useCustomModal();
    const studentRef = useRef<StudentModel[]>([]);
    const studentApi = useStudentApi()
    const [, setRenderTrigger] = useState(false);
    const [students, setStudents] = useState<StudentModel[]>([]);
    
    
  const setStudent = (student:unknown) => {
    const updatedData = plainToInstance(StudentModel, student)
    if(updatedData)
    studentRef.current.push(updatedData)

    // studentApi.sendPhoto(updatedData.photo!)
  }

  const getStudents = async () => {
    try {
        const response = await studentApi.getStudents();
        setStudents(response); // Atualiza diretamente o state
    } catch (error) {
        console.error("Erro ao buscar estudantes:", error);
    }
};

  useEffect (() => {
    getStudents()
    }, []);

  const createStudent = async(student:StudentModel)=>{
    const newStudent = plainToInstance(StudentModel, student)
    await studentApi.createStudent(newStudent)

  }

  const openCreateStudent = async () => {
    const newStudent = new StudentModel()
    await openCustomModal({
      component: StudentRegister,
      componentProps: { data: newStudent, 
          onConfirm: createStudent
        
      },
    });
  };

  const editCreateStudent = async (student: StudentModel) => {
    const data = plainToInstance(StudentModel, student);  
    await openCustomModal({
      component: StudentRegister,
      componentProps: {
        data,
        onConfirm: createStudent,
      },      
    });
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Estudantes</h2>
      <button className="btn btn-primary" onClick={openCreateStudent} data-bs-toggle="modal" data-bs-target="#exampleModal">
        cadastrar estudante 
      </button>
      <div className="row">
        {students.map((student, index) => (
            <StudentCard 
            student={student}
            onEdit={()=>editCreateStudent(student)} />
        ))}
      </div>
    </div>
  );
};

export default StudentList;