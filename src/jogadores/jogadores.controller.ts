import { BadRequestException, Body, Controller, Get, Param, ParseUUIDPipe, Post, Query, Res } from '@nestjs/common';
import { ICriarJogadorDTO } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Response } from 'express';

@Controller('api/v1/jogadores')
export class JogadoresController {

  constructor(
    private readonly jogadoresService: JogadoresService
  ){}

  @Post()
  public async criarJogador(
    @Body() { email, nome, telefone }:ICriarJogadorDTO
  ){
    const jogador = await this.jogadoresService.criar({ email, nome, telefone })
    return  { jogador }
  }

  @Get("detalhes")
  public async encontrarPorEmail(
    @Query("email") email: string | undefined,
    @Res() response: Response
  ){
    if(!email) throw new BadRequestException("Email é obrigatório.");

    const jogador = await this.jogadoresService.encontrarPorEmail(email);

    if(!jogador){
      return response.status(404).json({ message: "Jogador não encontrado"})
    }

    return response.json({ jogador })
  }

  @Get(":id")
  public async encontrarPorId(
    @Param("id", ParseUUIDPipe) id: string,
    @Res() response: Response
  ){
    const jogador = await this.jogadoresService.encontrarPorId(id);

    if(!jogador){
      return response.status(404).json({ message: "Jogador não encontrado"})
    }

    return response.json({ jogador })
  }

  @Get()
  public async mostrarTodos(){
    return this.jogadoresService.encontrarTodos()
  }
}
