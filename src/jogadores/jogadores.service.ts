import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { Jogador } from './model/jogador.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { EditarJogadorDTO } from './dtos/editar-jogador.dto';

interface IJogador extends Document, Omit<Jogador, "_id" | "id"> { }

@Injectable()
export class JogadoresService {

  constructor(
    @InjectModel('Jogador')
    private readonly jogadorModel: Model<IJogador>
  ) { }

  private readonly logger = new Logger(JogadoresService.name)

  async criar({ email, nome, telefone }: CriarJogadorDTO): Promise<Jogador>{
    this.logger.log(`criado jogador: ${nome}, ${ email } ${ telefone}`);

    const telefoneExiste = await this.jogadorModel.findOne({ telefone }).exec();

    if(telefoneExiste){
      throw new ConflictException("Telefone já cadastrado.")
    }

    const emailExist = await this.jogadorModel.findOne({ email }).exec();

    if(emailExist){
      throw new ConflictException("email já cadastrado.")
    }

    const jogadorModel = new this.jogadorModel({
      email,
      nome,
      telefone,
      posicaoRanking: null,
      ranking: null,
      urlFotoJogador: null,
    });

    const jogadorData = await jogadorModel.save()

    const jogador = new Jogador({
      _id: jogadorData._id,
      email: jogadorData.email,
      nome: jogadorData.nome,
      posicaoRanking: jogadorData.posicaoRanking,
      telefone: jogadorData.telefone,
      ranking: jogadorData.ranking,
      urlFotoJogador: jogadorData.urlFotoJogador
    });

    return jogador;
  }

  async encontrarPorId(id: string): Promise<Jogador | null>{
    const jogadorData = await this.jogadorModel.findOne({ _id: id }).exec();

    if(!jogadorData) return null;

    const jogador = new Jogador({
      _id: jogadorData._id,
      email: jogadorData.email,
      nome: jogadorData.nome,
      posicaoRanking: jogadorData.posicaoRanking,
      telefone: jogadorData.telefone,
      ranking: jogadorData.ranking,
      urlFotoJogador: jogadorData.urlFotoJogador
    });

    return jogador;
  }

  async encontrarPorEmail(email: string): Promise<Jogador | null>{
    const jogadorData = await this.jogadorModel.findOne({ email }).exec();

    if(!jogadorData) return null;

    const jogador = new Jogador({
      _id: jogadorData._id,
      email: jogadorData.email,
      nome: jogadorData.nome,
      posicaoRanking: jogadorData.posicaoRanking,
      telefone: jogadorData.telefone,
      ranking: jogadorData.ranking,
      urlFotoJogador: jogadorData.urlFotoJogador
    });

    return jogador;
  }

  async encontrarTodos(): Promise<Jogador[]>{
    const jogadores = await this.jogadorModel.find().exec();

    return jogadores.map(jogador => new Jogador(jogador));
  }

  async update({ id, email, nome, posicaoRanking,  ranking, telefone, urlFotoJogador }: EditarJogadorDTO): Promise<Jogador>{
    const jogadorExistente = await this.encontrarPorId(id);

    if(!jogadorExistente) throw new NotFoundException("Jogador não encontrado.");

    if(email){
      const emailJaCadastrado = await this.jogadorModel.findOne({ email }).exec();

      if(emailJaCadastrado) throw new ConflictException("Email ja cadastrado.");

      jogadorExistente.email = email;
    }

    if(telefone){
      const telefoneCadastrado = await this.jogadorModel.findOne({ telefone }).exec();

      if(telefoneCadastrado) throw new ConflictException("Telefone ja cadastrado.");

      jogadorExistente.telefone = telefone;
    }


    jogadorExistente.nome = nome ?? jogadorExistente.nome;
    jogadorExistente.posicaoRanking = posicaoRanking ?? jogadorExistente.posicaoRanking;
    jogadorExistente.ranking = ranking ?? jogadorExistente.ranking;
    jogadorExistente.urlFotoJogador = urlFotoJogador ?? jogadorExistente.urlFotoJogador;

    await this.jogadorModel.updateOne(
      { _id: id },
      {
        email: jogadorExistente.email,
        nome: jogadorExistente.nome,
        posicaoRanking: jogadorExistente.posicaoRanking,
        ranking: jogadorExistente.ranking,
        telefone: jogadorExistente.telefone,
        urlFotoJogador: jogadorExistente.urlFotoJogador
      }
    );

    return jogadorExistente;

  }

  async deletar(id: string): Promise<void> {
    const jogadorExiste = await this.encontrarPorId(id);

    if(!jogadorExiste) throw new NotFoundException("Jogador não encontrado.");

    await this.jogadorModel.deleteOne({ _id: id });
  }

}
