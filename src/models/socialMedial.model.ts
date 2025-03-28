import { IsIn, IsNotEmpty,  IsUrl, MaxLength } from "class-validator";

 export class SocialMediaModel {
    @IsIn(["Facebook", "LinkedIn"], { message: "A rede social deve ser Facebook ou LinkedIn." })
    type: string;
  
    @IsUrl({}, { message: "A URL da rede social deve ser válida." })
    @MaxLength(255, { message: "A URL da rede social não pode ter mais de 255 caracteres." })
    @IsNotEmpty({ message: "A URL é obrigatória." })
    url: string;
  }