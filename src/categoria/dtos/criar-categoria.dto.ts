import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from "class-validator";
import { IEvento } from "../model/categoria.model";

export class CriarCategoriaDTO {
  @IsString()
  @IsNotEmpty()
  readonly nome: string;

  @IsNotEmpty()
  @IsString()
  descricao: string;

  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  eventos: Array<IEvento>
}