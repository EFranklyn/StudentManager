import { 
    IsString, 
    IsEmail, 
    MinLength, 
    MaxLength, 
    Matches,
    ValidateNested,
    IsArray, 
    IsDateString,
    Validate,
    IsNotEmpty,
    ValidatorConstraint,
    ArrayMinSize,
    IsOptional
  } from "class-validator";
import { Type } from "class-transformer";
import {  SocialMediaModel } from "./socialMedial.model";
import { ChoiceModel } from "./choice.model";
@ValidatorConstraint({ name: "AgeValidation", async: false })
class AgeValidation {
  validate(value: string) {
    if (!value) return false;

    const birthDate = new Date(value);
    const today = new Date();

    if (isNaN(birthDate.getTime())) {
      return false;
    }

    let age = today.getFullYear() - birthDate.getFullYear();
    const birthMonth = birthDate.getMonth();
    const birthDay = birthDate.getDate();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    if (
      currentMonth < birthMonth ||
      (currentMonth === birthMonth && currentDay < birthDay)
    ) {
      age--;
    }

    return age >= 14;
  }

  defaultMessage() {
    return "O estudante deve ter pelo menos 14 anos.";
  }
}
  export class StudentModel {
    @IsString()
    @IsOptional()
    id: string | null = null;

    @IsString()
    @IsOptional()
    uuid: string | null = null;

    @IsString()
    @MinLength(3, { message: "O nome deve conter pelo menos 3 caracteres." })
    @MaxLength(255, { message: "O nome não pode ter mais de 255 caracteres." })
    @Matches(/^\S+\s+\S+/, { message: "O nome deve conter pelo menos nome e sobrenome." })
    @IsNotEmpty({ message: "O Nome é obrigatório." })
    fullName: string | null = null;
    
    @MaxLength(255, { message: "O e-mail não pode ter mais de 255 caracteres." })
    @IsEmail({}, { message: "O e-mail deve ser válido." })
    email: string | null = null;
  
    @IsDateString({ strict: true }, { message: "A data de nascimento deve estar no formato correto YYYY-MM-DD." })    
    @Validate(AgeValidation)
    @IsNotEmpty({ message: "A Data de Nascimento é obrigatória." })
    birthDate: string | null = null;
  
     
    @MaxLength(255, { message: "A instituição de ensino não pode ter mais de 255 caracteres." })
    @IsString({ message: "A Instituição de Ensino é obrigatória." })
    @IsNotEmpty({ message: "A Instituição de Ensino é obrigatória." })
    school: string | null = null;
  
    @Type(() => ChoiceModel)
    @ValidateNested()
    @IsNotEmpty({ message: "O Curso é obrigatório." }) 
    course: ChoiceModel | null;
  
    @Type(() => ChoiceModel)
    @ValidateNested()
    @IsNotEmpty({ message: "O estado é obrigatório." }) 
    state: ChoiceModel | null;
    

    @Type(() => ChoiceModel)
    @ValidateNested()
    @IsNotEmpty({ message: "A cidade é obrigatória." }) 
    city: ChoiceModel | null;
  
    @IsString()
    @IsNotEmpty({ message: "A foto é obrigatória." })
    photo: string | null = null;
  
    @IsArray()
    @ArrayMinSize(1, {
      message: 'Pelo menos uma rede social deve ser informada.',
    })
    @Type(() => SocialMediaModel)
    @ValidateNested({ each: true })
    @Type(() => SocialMediaModel) 
    socialMedias: SocialMediaModel[];
  
    // constructor(data: Partial<Student>) {
    //   Object.assign(this, data);
    // }
  }