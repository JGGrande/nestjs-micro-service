import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CriarCategoriaDTO } from './dtos/criar-categoria.dto';
import { Model } from 'mongoose';
import { ICategoria } from './model/categoria.model';
import { InjectModel } from '@nestjs/mongoose';
import { AtualizarCategoriaDTO } from './dtos/atualizar-categoria.dto';
import { JogadoresService } from 'src/jogadores/jogadores.service';


@Injectable()
export class CategoriaService {

  constructor(
    @InjectModel("Categoria")
    private readonly categoriaModel: Model<ICategoria>,
    private readonly jogadoresService: JogadoresService
  ){ }

  async criar({ nome, descricao, eventos }: CriarCategoriaDTO): Promise<ICategoria>{
    const nomeExiste = await this.categoriaModel.findOne({ nome }).exec();

    if(nomeExiste) throw new ConflictException("Categoria já cadastrada")

    const categoria = new this.categoriaModel({ nome, descricao, eventos });

    await categoria.save();

    return categoria
  }

  async encontrarTodos(): Promise<ICategoria[]>{
    return this.categoriaModel.find().populate("jogadores").exec()
  }
  async encontrarPorId(id: string): Promise<ICategoria | null>{
    const categoria = await this.categoriaModel.findOne({ _id: id }).exec();

    if(!categoria){
      return null;
    }

    return categoria
  }

  async atualizar(id: string, { descricao, eventos }: AtualizarCategoriaDTO): Promise<ICategoria>{
    const categoriaExiste = await this.categoriaModel.findOne({ _id: id }).exec();

    if(!categoriaExiste)
      throw new NotFoundException("Categoria não encontrada.")


    const categoria = await this.categoriaModel.findByIdAndUpdate(id, { descricao, eventos }).exec();

    categoria.descricao = descricao;
    categoria.eventos = eventos;

    return categoria
  }

  async adicionarJogador(nome: string, jogadorId: string): Promise<void> {
    const categoriaExistente = await this.categoriaModel.findOne({ nome }).exec();

    if(!categoriaExistente)
      throw new NotFoundException("Categoria não encontrada.")

    const jogadorExistente = await this.jogadoresService.encontrarPorId(jogadorId)

    if(!jogadorExistente)
      throw new NotFoundException("Jogador não encontrado.")

    const jogadorJaCadastradoNaCategoria = await this.categoriaModel
      .findOne({ nome })
      .where('jogadores')
      .in([ jogadorId ])
      .exec()

    if(jogadorJaCadastradoNaCategoria)
      throw new ConflictException("Jogador já cadastrado na categoria")

    categoriaExistente.jogadores.push(jogadorExistente);

    await this.categoriaModel.findOneAndUpdate({ nome }, { $set: categoriaExistente }).exec();
  }

}
