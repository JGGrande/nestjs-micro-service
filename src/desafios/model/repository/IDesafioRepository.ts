import { IDesafio } from "../IDesafio";

export interface IDesafioRepository {
  findAll(): Promise<IDesafio[]>;
}