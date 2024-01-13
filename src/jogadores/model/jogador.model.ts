interface IJogador {
  _id: string;
  telefone: string;
  email: string;
  nome: string;
  ranking: string | null;
  posicaoRanking: number | null;
  urlFotoJogador: string | null;
}

export class Jogador {
  private _id: string;
  private _telefone: string;
  private _email: string;
  private _nome: string;
  private _ranking: string | null;
  private _posicaoRanking: number | null;
  private _urlFotoJogador: string | null;

  constructor({ _id, email, nome, posicaoRanking, ranking, telefone, urlFotoJogador }:IJogador){
    this._id = _id;
    this._email = email;
    this._nome = nome;
    this._ranking = ranking;
    this._posicaoRanking = posicaoRanking;
    this._telefone = telefone;
    this._urlFotoJogador = urlFotoJogador;
  }

  get id(){
    return this._id;
  }

  get telefone(){
    return this._telefone;
  }
  set telefone(value: string){
    this._telefone = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get nome(): string {
    return this._nome;
  }

  set nome(value: string) {
    this._nome = value;
  }

  get ranking(): string | null {
    return this._ranking;
  }

  set ranking(value: string | null) {
    this._ranking = value;
  }

  get posicaoRanking(): number | null {
    return this._posicaoRanking;
  }

  set posicaoRanking(value: number | null) {
    this._posicaoRanking = value;
  }

  get urlFotoJogador(): string | null {
    return this._urlFotoJogador;
  }

  set urlFotoJogador(value: string | null) {
    this._urlFotoJogador = value;
  }


}
