export interface IEditarJogadorDTO {
  id: string;
  telefone?: string;
  email?: string;
  nome?: string;
  ranking?: string | null;
  posicaoRanking?: number | null;
  urlFotoJogador?: string | null;
}