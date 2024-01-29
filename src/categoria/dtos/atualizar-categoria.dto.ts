import { ArrayMinSize, IsArray, IsOptional, IsString } from "class-validator";
import { IEvento } from "../model/categoria.model";

export class AtualizarCategoriaDTO {
  @IsString()
  @IsOptional()
  descricao: string;

  @IsArray()
  @ArrayMinSize(1)
  eventos: Array<IEvento>;

}