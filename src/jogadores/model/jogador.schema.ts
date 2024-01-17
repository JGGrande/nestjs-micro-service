import { Schema } from "mongoose";

export const JogadorSchema = new Schema({
  telefone: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  nome: {
    type: String,
  },
  posicaoRanking: {
    type: Number
  },
  urlFotoJogador: {
    type: String
  }
}, {
  timestamps: true,
  collection: 'jogadores'
});