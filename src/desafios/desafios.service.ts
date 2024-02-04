import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IDesafio } from './model/IDesafio';
import { CriarDesafioDTO } from './dtos/criar-desadio.dto';
import { Connection, Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { CategoriaService } from 'src/categoria/categoria.service';
import { IDesafioRepository } from './model/repository/IDesafioRepository';
import { AtualizarDesafioDTO } from './dtos/atualizar-desafio.dto';
import { DesafioStatusEnum } from './model/DesafioStatus.enum';
import { AtribuirDesafioPartidaDTO } from './dtos/atribuir-desafio-partida.dto';
import { PartidasService } from 'src/partidas/partidas.service';

@Injectable()
export class DesafiosService {

  constructor(
    @InjectModel("Desafio")
    private readonly desafioModel: Model<IDesafio>,
    private readonly jogadoresService: JogadoresService,
    private readonly categoriaService: CategoriaService,
    @Inject("DesafioRepository")
    private readonly desafioRepository: IDesafioRepository,
    private readonly partidasService: PartidasService,
    @InjectConnection()
    private readonly connection: Connection
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

  async consultarPorJogador(jogadorId: string): Promise<IDesafio[]>{
    const desafios = await this.desafioModel
      .find()
      .where('jogadores')
      .in([ jogadorId ])
      .populate(["solicitante","jogadores", "partida"])
      .exec()

    return desafios;
  }

  async listarTodos(): Promise<IDesafio[]>{
    return this.desafioRepository.findAll();
  }

  async atualizar(desafioId: string, { dataHoraDesafio, status }: AtualizarDesafioDTO): Promise<IDesafio> {
    const desafioExiste = await this.desafioModel.findOne({ _id: desafioId }).exec();

    if(!desafioExiste) {
      throw new NotFoundException("Desafio não encontrado")
    }

    const desafio = await this.desafioModel.findByIdAndUpdate(desafioId, { $set: { dataHoraDesafio, status } }).exec();

    desafio.status = status;
    desafio.dataHoraDesafio = desafio.dataHoraDesafio

    return desafio;
  }

  async atribuirPartida(id: string, { def ,resultado }: AtribuirDesafioPartidaDTO ){
    const session = await this.connection.startSession();

    session.startTransaction();

    try{
      const desafioExiste = await this.desafioModel.findOne({ _id: id }).exec();

      if(!desafioExiste) {
        throw new NotFoundException("Desafio não encontrado")
      }

      const vencedorFazParteDoDesafio = desafioExiste.jogadores.includes(def);

      if(!vencedorFazParteDoDesafio){
        throw new ConflictException("Vencedor não está vinculado ao desafio.")
      }

      const partida = await this.partidasService.criar({
        categoria: desafioExiste.categoria,
        def,
        resultado,
        jogadores: desafioExiste.jogadores
      });

      const statusRealiazado = DesafioStatusEnum.REALIZADO;

      const desafioAtualizado = await this.desafioModel.findByIdAndUpdate(id, {
        status: statusRealiazado,
        partida
      }, { session }).exec();

      await session.commitTransaction();

      desafioAtualizado.status = statusRealiazado;
      desafioAtualizado.partida = partida;

      session.endSession();

      return desafioAtualizado
    }catch( error ) {
      console.error( error );

      session.endSession()

      throw new BadRequestException("Erro ao atribuir partida, entre em contato com o suporte.");
    }
  }

  async deletar(id: string): Promise<void>{
    const desafioExiste = await this.desafioModel.findOne({ _id: id }).exec();

    if(!desafioExiste) {
      throw new NotFoundException("Desafio não encontrado")
    }

    const status = DesafioStatusEnum.CANCELADO

    await this.desafioModel.findByIdAndUpdate(id, { $set: { status } }).exec();
  }
}
