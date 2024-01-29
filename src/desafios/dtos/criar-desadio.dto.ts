import { ArrayMaxSize, ArrayMinSize, IsArray, IsDateString, IsNotEmpty, IsString } from "class-validator";
import { Jogador } from "src/jogadores/model/jogador.model";

export class CriarDesafioDTO {
  @IsNotEmpty()
  @IsDateString()
  dataHoraDesafio: Date;

  @IsNotEmpty()
  @IsString()
  solicitanteId: string;

  @IsArray()
  @ArrayMaxSize(2)
  @ArrayMinSize(2)
  jogadores: Array<Jogador>;

}