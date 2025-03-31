import { IsString } from "class-validator";

 export class ChoiceModel {
    @IsString()
    label:string | null = null;

    @IsString()
    value: string | null = null;
  }