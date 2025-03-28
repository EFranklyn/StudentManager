// src/hooks/useCustomModal.ts
import axios from 'axios';

// Ajustando para garantir que as props do modal sejam tipadas corretamente
interface CourseOptios {
  course: string;
  courseId: string
  academicLevel: string
}

const useCourseOptions = () => {
    const url ='http://dados.recife.pe.gov.br/is/api/3/action/datastore_search?resource_id=738b884e-e846-4396-8cb3-f3390e00e598&limit=1000' 
    
    const getCourseOptions = async(): Promise<CourseOptios[] | undefined> => {
        try {
            const response = await axios.get(url);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const courses = response.data.result.records.map((course:any)=>{
                if(course)
                return {
                    course: course.nome_grau,
                    courseId: course.codigo_ocde,
                    academicLevel: course.grau_academico
                }

            })
            return courses


          } catch (error) {
            console.error("Erro ao buscar opções:", error);
            throw error
          }
        };

    return {
        getCourseOptions,
    };

}

  


export default useCourseOptions;