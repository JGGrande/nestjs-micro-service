import { Jogador } from "src/jogadores/model/jogador.model";

export interface ICategoria extends Document {
  readonly nome: string;
  descricao: string;
  eventos: Array<IEvento>;
  jogadores: Array<Jogador>
}

export interface IEvento {
  nome: string;
  operacao: string;
  valor: number;
}