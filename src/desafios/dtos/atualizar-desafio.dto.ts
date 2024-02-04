import { IsDateString, IsIn } from "class-validator";
import { DesafioStatusEnum } from "../model/DesafioStatus.enum";

export class AtualizarDesafioDTO {
  @IsDateString()
  dataHoraDesafio: Date

  @IsIn([
    DesafioStatusEnum.ACEITO,
    DesafioStatusEnum.RECUSADO,
    DesafioStatusEnum.CANCELADO
  ])
  status: DesafioStatusEnum
}
