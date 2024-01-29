import { Schema } from "mongoose";
import { DesafioStatusEnum } from "./DesafioStatus.enum";

export const DesafioSchema = new Schema({
  dataHoraDesafio: { type: Date },
  dataHoraSolicitacao: { type: Date, default: new Date()},
  dataHoraResposta: { type: Date },
  status: { type: String, default: DesafioStatusEnum.PENDENTE },
  solicitante: { type: Schema.Types.ObjectId, ref: "Jogador" },
  categoria: { type: String },
  jogadores:[{
    type: Schema.Types.ObjectId,
    ref: "Jogador"
  }],
  partida: {
    type: Schema.Types.ObjectId,
    ref: "Partida"
  },
},
{
  timestamps: true,
  collection: 'desafios',
}
)