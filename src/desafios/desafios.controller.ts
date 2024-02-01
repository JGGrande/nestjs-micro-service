import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Res } from '@nestjs/common';
import { DesafiosService } from './desafios.service';
import { CriarDesafioDTO } from './dtos/criar-desadio.dto';
import { IDesafio } from './model/IDesafio';
import { isValidObjectId } from 'mongoose';
import { Response } from 'express';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao-parametros.pipe';
import { AtualizarDesafioDTO } from './dtos/atualizar-desafio.dto';
import { AtribuirDesafioPartidaDTO } from './dtos/atribuir-desafio-partida.dto';

@Controller('api/v1/desafios')
export class DesafiosController {
  constructor(
    private readonly desafiosService: DesafiosService
  ){ }

  @Post()
  async criar(
    @Body() criarDesafioDTO: CriarDesafioDTO
  ):Promise<IDesafio>{
    return this.desafiosService.criar(criarDesafioDTO);
  }

  @Get()
  async listarTodos(
    @Res() response: Response,
    @Query("jogadorId") jogadorId?: string
  ): Promise<Response>{

    if(jogadorId && !isValidObjectId(jogadorId)){
      return response.status(400).json({ messagem: "Id não é valido" })
    }
    const desafios = jogadorId
      ? await this.desafiosService.consultarPorJogador(jogadorId)
      : await this.desafiosService.listarTodos();

    return response.json(desafios)
  }

  @Put(":id")
  async atualizar(
    @Param("id", ValidacaoParametrosPipe) desafioId: string,
    @Body() atualizarDesafioDTO: AtualizarDesafioDTO
  ){
    return this.desafiosService.atualizar(desafioId, atualizarDesafioDTO)
  }

  @Patch(":id/partidas")
  async atribuirPartida(
    @Param("id", ValidacaoParametrosPipe) id: string,
    @Body() body: AtribuirDesafioPartidaDTO
  ){
    return this.desafiosService.atribuirPartida(id, body);
  }

  @Delete(":id")
  async deletar(
    @Param("id", ValidacaoParametrosPipe) id: string
  ){
    return this.desafiosService.deletar(id);
  }
}
