import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { IDesafio } from './model/IDesafio';
import { CriarDesafioDTO } from './dtos/criar-desadio.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { CategoriaService } from 'src/categoria/categoria.service';

@Injectable()
export class DesafiosService {

  constructor(
    @InjectModel("Desafio")
    private readonly desafioModel: Model<IDesafio>,
    private readonly jogadoresService: JogadoresService,
    private readonly categoriaService: CategoriaService
  ){ }

  async criar({ dataHoraDesafio, jogadores, solicitanteId }: CriarDesafioDTO): Promise<IDesafio>{

    const solicitanteEUmJogador = jogadores.some( jogador => jogador.id === solicitanteId);

    if(!solicitanteEUmJogador){
      throw new ConflictException("Solicitante não é um jogador")
    }

    const encontrarJogadoresPromises = jogadores.map( jogador  => {
      return this.jogadoresService.encontrarPorId(jogador.id)
    })

    const jogadoresNoDesafio = await Promise.all(encontrarJogadoresPromises);

    if(jogadoresNoDesafio.includes(null)){
      throw new NotFoundException("Jogador não encontrado")
    }

    const categoria = await this.categoriaService.encontarPorJogador(solicitanteId);

    if(!categoria){
      throw new NotFoundException("Jogador não localizado em nenhuma categoria.");
    }

    const solicitanteObj = jogadoresNoDesafio.find( jogador => jogador.id.toString() === solicitanteId)

    if(!solicitanteObj){
      throw new BadRequestException("Solicitante não encontrado")
    }

    const desafio = new this.desafioModel({
      dataHoraDesafio,
      jogadores: jogadoresNoDesafio,
      solicitante:solicitanteObj,
      categoria: categoria.nome,
    })

    await desafio.save();

    return desafio
  }
  async listarTodos(): Promise<IDesafio[]>{
    return this.desafioModel.find().exec()
  }
}
