import axios from 'axios';
import { StudentModel } from '../models/student.model';
import { v4 as uuidv4 } from 'uuid';

const useStudentApi = () => {
    const apiUrl = 'https://668066d956c2c76b495bf64a.mockapi.io/api/v1/user'
    
    const sendPhoto = async(photoUrl:string, uuid:string): Promise<boolean | undefined> => {
        const response = await fetch(photoUrl);
      const imageBlob = await response.blob();

      // Converter o blob em um objeto File
      const file = new File([imageBlob], 'image.jpg', { type: imageBlob.type });
        const formData = new FormData();
        formData.append('file', file);  // O arquivo da imagem
        formData.append('upload_preset', 'o6mjnw7p');
        formData.append('public_id', uuid);

        try {
            const response = await axios.post(
            `https://api.cloudinary.com/v1_1/student-test/image/upload`,
            formData
            );
            
            console.log('Imagem carregada com sucesso!', response.data.secure_url);
            return response.data.secure_url; // Retorna a URL segura da imagem carregada
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

        const createStudent = async (student: StudentModel): Promise<StudentModel | undefined> => {
            // const newStudent = { ...student, id: uuidv4() };  // Gerando um UUID único para o novo estudante
            
            const { photo, ...studentDataWithoutPhoto } = student;
            const newStudent = { ...studentDataWithoutPhoto, uuid: uuidv4() };
            try {
                const response = await axios.post(apiUrl, newStudent);
                console.log('Estudante criado com sucesso:', response.data);
                 // Retorna o estudante criado com o UUID
                await sendPhoto(photo!, newStudent.uuid)
                return response.data; 
            } catch (error) {
                console.error('Erro ao criar estudante:', error);
                return undefined;
            }
        };

        const updateStudent = async (id: string, updatedStudent: Partial<StudentModel>): Promise<StudentModel | undefined> => {
            try {
                const response = await axios.put(`${apiUrl}/${id}`, updatedStudent);
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
        createStudent
    };

}
export default useStudentApi;
