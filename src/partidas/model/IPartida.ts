import { IResultado } from "src/desafios/model/IDesafio";
import { Jogador } from "src/jogadores/model/jogador.model";

export interface IPartida extends Document {
  categoria: string;
  jogadores: Array<Jogador>;
  def: Jogador;
  resultado: Array<IResultado>;
}