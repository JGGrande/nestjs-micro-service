import { Model } from "mongoose";
import { IDesafio } from "../model/IDesafio";
import { IDesafioRepository } from "../model/repository/IDesafioRepository";
import { InjectModel } from "@nestjs/mongoose";

export class MongosseDesafioRepository implements IDesafioRepository {

  constructor(
    @InjectModel("Desafio")
    private readonly desafioModel: Model<IDesafio>,
  ){}

  findAll(): Promise<IDesafio[]> {
    return this.desafioModel.find();
  }
}