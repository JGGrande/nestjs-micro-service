import { Document } from "mongoose";
import { Jogador } from "src/jogadores/model/jogador.model";
import { DesafioStatusEnum } from "./DesafioStatus.enum";

export interface IDesafio extends Document {
  dataHoraDesafio: Date;
  dataHoraSolicitacao: Date;
  dataHoraResposta: Date;
  status: DesafioStatusEnum;
  solicitante: Jogador;
  categoria: string;
  jogadores: Array<Jogador>;
  partida: IPartida
}

export interface IPartida extends Document {
  categoria: string;
  jogadores: Array<Jogador>;
  def: Jogador;
  resultado: Array<IResultado>;
}
export interface IResultado extends Document {
  setPoint: string;
}