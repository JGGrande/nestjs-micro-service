import { ArrayContains, IsArray, IsNotEmpty } from "class-validator";
import { Jogador } from "src/jogadores/model/jogador.model";
import { IResultado } from "../model/IDesafio";

export class AtribuirDesafioPartidaDTO {
  @IsNotEmpty()
  def: Jogador

  @IsNotEmpty()
  @IsArray()
  resultado: Array<IResultado>
}