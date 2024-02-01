import { IsArray, IsNotEmpty, IsObject, IsString } from "class-validator"
import { IResultado } from "src/desafios/model/IDesafio"
import { Jogador } from "src/jogadores/model/jogador.model"

export class CriarPartidaDTO {

  @IsNotEmpty()
  @IsString()
  categoria: string;

  @IsNotEmpty()
  @IsArray()
  jogadores: Array<Jogador>;

  @IsNotEmpty()
  @IsObject()
  def: Jogador

  @IsNotEmpty()
  @IsArray()
  resultado: Array<IResultado>

}