import axios from 'axios';
import { StudentModel } from '../models/student.model';
import { v4 as uuidv4 } from 'uuid';

const useStudentApi = () => {
    const apiUrl = 'https://668066d956c2c76b495bf64a.mockapi.io/api/v1/user/'
    
    const sendPhoto = async(photoUrl:string, uuid:string): Promise<string | undefined> => {
        const response = await fetch(photoUrl);
      const imageBlob = await response.blob();

      // Converter o blob em um objeto File
      const file = new File([imageBlob], 'image.jpg', { type: imageBlob.type });
        const formData = new FormData();
        formData.append('file', file);  // O arquivo da imagem
        formData.append('upload_preset', 'o6mjnw7p');
        formData.append('public_id', uuid);
        formData.append('filename_override', uuid);

        try {
            const response = await axios.post(
            `https://api.cloudinary.com/v1_1/student-test/image/upload`,
            formData
            );
            
            console.log('Imagem carregada com sucesso!', response.data.secure_url);
            return response.data.url; // Retorna a URL segura da imagem carregada
        } catch (error) {
            console.error('Erro ao carregar imagem:', error);
        }
        };

        const getStudents = async (): Promise<StudentModel[]> => {
            try {
                const response = await axios.get(apiUrl);
                return response.data;  // Retorna a lista de estudantes
            } catch (error) {
                console.error('Erro ao buscar estudantes:', error);
                return [];
            }
        };

        const getStudent = async (uuid:string): Promise<StudentModel | undefined> => {
            try {
                const response = await axios.get(apiUrl+`?uuid=${uuid}`);
                return response.data[0];  // Retorna a lista de estudantes
            } catch (error) {
                console.error('Erro ao buscar estudantes:', error);
                return undefined
            }
        };


        const createStudent = async (student: StudentModel): Promise<StudentModel | undefined> => {
            // const newStudent = { ...student, id: uuidv4() };  // Gerando um UUID único para o novo estudante
            
            
            const newStudent = { ...student, uuid: uuidv4() };
            try {
                const photoResponse = await sendPhoto(newStudent.photo!, newStudent.uuid)
                newStudent.photo = photoResponse!
                const response = await axios.post(apiUrl, newStudent);
                console.log('Estudante criado com sucesso:', response.data);
                 // Retorna o estudante criado com o UUID
                
                return response.data; 
            } catch (error) {
                console.error('Erro ao criar estudante:', error);
                return undefined;
            }
        };

        const updateStudent = async (updatedStudent: Partial<StudentModel>): Promise<StudentModel | undefined> => {
            console.log('tenho isso:', updatedStudent)

            let student = updatedStudent
            try{
                const isUpdatePhoto = !student.photo?.includes(student.uuid!)

                if(isUpdatePhoto){
                student = { ...student, uuid: uuidv4() };
                const photoResponse = await sendPhoto(student.photo!, student.uuid!)
                student.photo = photoResponse!
                }

                const response = await axios.put(apiUrl+`/${student.id}`, student);
                console.log('Estudante atualizado com sucesso:', response.data);
                return response.data;  // Retorna o estudante atualizado

            } catch (error) {
                console.error('Erro ao atualizar estudante:', error);
                return undefined;
            }
        };

        const deleteStudent = async (delteStudent: Partial<StudentModel>): Promise<StudentModel | undefined> => {
            
            try{

                const response = await axios.delete(apiUrl+`/${delteStudent.id}`);
                console.log('Estudante atualizado com sucesso:', response.data);
                return response.data;  // Retorna o estudante atualizado

            } catch (error) {
                console.error('Erro ao atualizar estudante:', error);
                return undefined;
            }
        };

    return {
        sendPhoto,
        getStudents,
        createStudent,
        getStudent,
        updateStudent,
        deleteStudent
    };

}
export default useStudentApi;
