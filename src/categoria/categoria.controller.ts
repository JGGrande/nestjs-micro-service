import { Body, Controller, Get, Param, Patch, Post, Put, Res } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CriarCategoriaDTO } from './dtos/criar-categoria.dto';
import { ICategoria } from './model/categoria.model';
import { Response } from 'express';
import { ValidacaoParametrosPipe } from '../common/pipes/validacao-parametros.pipe';
import { AtualizarCategoriaDTO } from './dtos/atualizar-categoria.dto';

@Controller('api/v1/categorias')
export class CategoriaController {
  constructor(
    private readonly categoryService: CategoriaService
  ){ }

  @Post()
  async criar(
    @Body() { descricao, eventos, nome }: CriarCategoriaDTO
  ): Promise<ICategoria>
  {
    return this.categoryService.criar({ descricao, eventos, nome })
  }

  @Get()
  async encontrarTodos(): Promise<ICategoria[]>{
    return this.categoryService.encontrarTodos()
  }

  @Get(":id")
  async encontrarPorId(
    @Param("id", ValidacaoParametrosPipe) id: string,
    @Res() response: Response
  ): Promise<Response<ICategoria | null>> {
    const categoria = await this.categoryService.encontrarPorId(id)

    if(!categoria){
      return response.status(404).json(categoria);
    }

    return response.json(categoria);
  }

  @Put(":id")
  async atualizar(
    @Param("id", ValidacaoParametrosPipe) id: string,
    @Body() atualizarCategoriaDTO: AtualizarCategoriaDTO
  ) {
    return this.categoryService.atualizar(id, atualizarCategoriaDTO)
  }

  @Patch(":nome/jogadores/:jogadorId")
  async adicionarJogador(
    @Param("nome", ValidacaoParametrosPipe) nome: string,
    @Param("jogadorId", ValidacaoParametrosPipe) jogadorId: string
  ){
    return this.categoryService.adicionarJogador(nome, jogadorId)
  }
}
