import React, { useEffect, useState } from "react";
import StudentCard from "../../components/student/studentCard";
import { StudentModel } from "../../models/student.model";
import useCustomModal from "../../hooks/useCustomModal";
import StudentForm from "../../components/modals/StudentRegister";
import { plainToInstance } from "class-transformer";
import useStudentApi from "../../services/useStudent";
import useSweetAlert from "../../hooks/useSweetAlert";


const StudentList: React.FC = () => {    
    const { openCustomModal } = useCustomModal();
    const studentApi = useStudentApi()
    const [students, setStudents] = useState<StudentModel[]>([]);
    const { showAlert, showToast } = useSweetAlert();

  const getStudents = async () => {
    try {
        const response = await studentApi.getStudents();
        setStudents(response);
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
    getStudents()
  }

  const editStudent = async(student:StudentModel)=>{
    const newStudent = plainToInstance(StudentModel, student)
    await studentApi.updateStudent(newStudent)
    getStudents()

  }

  const openCreateStudent = async () => {
    const newStudent = new StudentModel()
    await openCustomModal({
      component: StudentForm,
      componentProps: { data: newStudent, 
          onConfirm: createStudent        
      },
    });
  };

  
  const deleteStudent = async (student:StudentModel) =>{
    const constinue =  await showAlert(`Tem certeza que deseja deletar o estudante ${student.fullName} ?`, 
      'warning').then((confirmed) => {return confirmed})
    if(constinue){
      await studentApi.deleteStudent(student)
      getStudents()
      showToast('O estudante foi deletado', 'success')
    }
    
  }

  const editCreateStudent = async (student: StudentModel) => {
    const data = plainToInstance(StudentModel, student);  
    await openCustomModal({
      component: StudentForm,
      componentProps: {
        data,
        onConfirm: editStudent,
      },      
    });
  };

  return (
    <div className="container mt-4">
      <div className="container  d-flex justify-content-end p-0  ml-5 pe-5">
      <button className="btn btn-primary" onClick={openCreateStudent} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Cadastrar Estudante 
      </button>
      </div>
      <h2 className="mb-3">Estudantes</h2>
      <div className="row">
        {students.map((student) => (
            <StudentCard 
            key={student.id}
            student={student}
            onEdit={()=>editCreateStudent(student)}
            onDelete={()=>deleteStudent(student)} />
        ))}
      </div>
    </div>
  );
};

export default StudentList;