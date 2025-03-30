import React, { useEffect, useState } from 'react';
import SmartInput from '../smartInput/SmartInput';
import { StudentModel } from '../../models/student.model';
import { validate } from 'class-validator';
import SearchableSelect from '../searchableInput/SearchableInput';
import useCourseOptions from '../../services/useCourseOptions';
import useLocationOptions from '../../services/useLocationOtions';
import { ChoiceModel } from '../../models/choice.model';
import SocialMediaForm from '../socialMediaSelect/SocialMediaSelect';
import { extractErrors } from '../../utils/extractErrors';
import { plainToClass } from 'class-transformer';
import PhotoManager from '../photoManager/PhotoManager';
import { SocialMediaModel } from '../../models/socialMedial.model';
import useStudentApi from '../../services/useStudent';

interface StudentRegisterProps {
  data?: StudentModel;
  onConfirm: (data: StudentModel) => Promise<void>;
  handleClose?: () => void;
}

const StudentRegister: React.FC<StudentRegisterProps> = ({ data, onConfirm, handleClose  }) => {
  const courseOptiosService = useCourseOptions();
  const locationService = useLocationOptions();
  const studentApi = useStudentApi();
  const [student, setStudent] = useState<StudentModel>(new StudentModel());
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [errors, setErrors]:any = useState({});
  const [isLoading, setIsLoading] = useState(false); 

  const [courseOptions, setCourseOptions] = useState([{label: '', value: ''}]);
  const [stateOptions, setStateOptions] = useState([{label: '', value: ''}]);
  const [cityOptions, setCityOptions] = useState([{label: '', value: ''}]);

  useEffect(() => {
    const updateStudent = async()=>{
      if(data && data.uuid){
        const _student = await studentApi.getStudent(data.uuid)
        if(_student){
          setStudent(_student)
          handleState(_student.state)
        }        
      }      
    }

    
    const fetchOptions = async () => {
      try {
        const options =  await courseOptiosService.getCourseOptions()
        const _courseOptions = (options ?? []).map((course) => {
          return {
            label: course.course,
            value: course.courseId 
          }
        })
        
        setCourseOptions(_courseOptions)  
        const states = await locationService.getStateOptions()   
        setStateOptions(states)   
      } catch (error) {
        console.error("Erro ao buscar opções:", error);
      }
    };
    updateStudent();
    fetchOptions();
  }, []);

  const ValidateStudent = async(): Promise<boolean> => {
    const studentData = plainToClass(StudentModel, student);
    const validationErrors = await validate(studentData)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _errors: any = extractErrors(validationErrors)   

    setErrors(_errors)

    return Object.keys(_errors).length === 0
    }
  

    const handleConfirm = async () => {
      const isValid = await ValidateStudent();
      if (!isValid) {
        console.log(Object.keys(errors));
        return;
      }
  
      setIsLoading(true); // ✅ Iniciar loading
      try {
        await onConfirm(student);
        setIsLoading(false); // ✅ Encerrar loading
        handleClose!();
      } catch (error) {
        console.error('error', error);
        setIsLoading(false); // ✅ Encerrar loading em caso de erro
      }
    };
  

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const _birthDate  = e.target.value
    setStudent((prev) => ({
      ...prev,
      birthDate: _birthDate
    }));
  }

  const handleCourse = (course: ChoiceModel | null) => {
    setStudent((prev) => ({
      ...prev,
      course: course
    }));
  }

  const handleState = async (state:ChoiceModel | null) => {
    if(!state){
      setCityOptions([{label: '', value: ''}])      
      handleCity(null)
    }
    setStudent((prev) => ({
      ...prev,
      state: state
    }));

    if(state){
      const cities = await locationService.getCity(state.value!)
      setCityOptions(cities)
    }
  }

  const handleCity = (city: ChoiceModel | null) => {
    setStudent((prev) => ({
      ...prev,
      city: city
    }));
  }

  const handleSocialMedia = (socialMedias: SocialMediaModel[]) =>{
    setStudent((prev) => ({
      ...prev,
      socialMedias: socialMedias
    }));
  }

  const handleImage = (photo:string)=>{
    setStudent((prev) => ({
      ...prev,
      photo: photo
    }));
  }

  return (
    <div className='container card m-0 p-4'>
      <div className="container  d-flex justify-content-end p-2  mt-1 mb--5">
        <button
          type="button"
          className=" btn rounded-circle btn-close "
          onClick={handleClose}/>
      </div>
      
      <div className='container  d-flex justify-content-center p-0'><h4>Cadastrar Estudante</h4></div>
      <div className='container  d-flex justify-content-center p-1  mt-1 mb--5'>
        <PhotoManager 
          onChange={(e)=>(handleImage(e))}
          photoUrl={student.photo}
          error={errors['photo']}
          />
        </div>
      <div className='row'>
        <div className='col-4'>
            <SmartInput 
                value={student.fullName ?? ''} 
                onChange={(value) => setStudent((prev) => ({
                  ...prev,
                  fullName: value
                })) }
                autoComplete="name" 
                placeholder="Digite seu Nome Completo"
                label="Nome Completo*"
                error={errors['fullName']}
            />        
        </div> 
        <div className='col-4'>
            <SmartInput 
                value={student.email ?? ''} 
                onChange={(value) => setStudent((prev) => ({
                  ...prev,
                  email: value
                }))}
                inputMode="email" 
                autoComplete="email" 
                placeholder="Digite seu email"
                label="E-mail*"
                error={errors['email']}
            />
        </div>
        <div className='col-4'>
            <div className="mb-1">
                <span  className="form-control-label fs-6 fw-bold text-secondary">
                Data de nascimento*
                </span>
                <input
                    type="date"
                    id="birthdate"
                    value={student.birthDate ?? ''}
                    onChange={(e) => (handleDate(e))}
                    className={`form-control ${errors.birthDate ? 'is-invalid' : ''}`}
                />
                {errors['birthDate'] && <small className="text-danger">{errors['birthDate']}</small>}
            </div>
        </div>
        <div className='col-4'>
            <SmartInput 
                value={student.school ?? ''} 
                onChange={(value) => setStudent((prev) => ({
                  ...prev,
                  school: value
                }))}
                autoComplete="off" 
                placeholder="Digite sua Instituição de Ensino"
                label="Instituição de Ensino*"
                error={errors['school']}
            />
        </div>
        <div className='col-8'>
          <SearchableSelect 
            label="Curso*"            
            options={courseOptions} 
            value={student.course?.value ?? ''} 
            onChange={(e) => ( handleCourse(e) )} 
            error={errors['course']}
          />
        </div>
        <div className='col-4'>
          <SearchableSelect 
            label="Estado*"            
            options={stateOptions} 
            value={student.state?.value ?? ''} 
            onChange={(e) => ( handleState(e) )} 
            error={errors['state']}
            
          />
        </div>
        <div className='col-4'>
          <SearchableSelect 
            label="Cidade*"            
            options={cityOptions} 
            value={student.city?.value ?? ''} 
            onChange={(e) => ( handleCity(e) )} 
            error={errors['city']}
            
          />
        </div>
        <div className='col-12'>
          <SocialMediaForm
          value={student.socialMedias} 
          onChange={(e) => ( handleSocialMedia(e) )} 
          errors={errors}
          />          
        </div>
      
      <button className='btn btn-primary mt-4' onClick={handleConfirm}>
      {isLoading ? "Salvando..." : "Salvar"}
        </button>
    </div>
    </div>
  );
};

export default StudentRegister;

