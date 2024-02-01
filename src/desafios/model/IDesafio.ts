import { Document } from "mongoose";
import { Jogador } from "src/jogadores/model/jogador.model";
import { DesafioStatusEnum } from "./DesafioStatus.enum";
import { IPartida } from "src/partidas/model/IPartida";

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

export interface IResultado extends Document {
  setPoint: string;
}