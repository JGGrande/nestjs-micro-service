import { IsDateString, IsEnum, IsIn, IsString } from "class-validator";
import { DesafioStatusEnum } from "../model/DesafioStatus.enum";

export class AtualizarDesafioDTO {
  @IsDateString()
  dataHoraDesafio: Date

  @IsEnum(DesafioStatusEnum)
  @IsIn([
    DesafioStatusEnum.ACEITO,
    DesafioStatusEnum.RECUSADO,
    DesafioStatusEnum.CANCELADO
  ])
  status: DesafioStatusEnum
}
