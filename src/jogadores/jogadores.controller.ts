import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, Query, Res } from '@nestjs/common';
import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Response } from 'express';
import { EditarJogadorDTO } from './dtos/editar-jogador.dto';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao-parametros.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {

  constructor(
    private readonly jogadoresService: JogadoresService
  ){}

  @Post()
  public async criarJogador(
    @Body() { email, nome, telefone }: CriarJogadorDTO
  ){
    const jogador = await this.jogadoresService.criar({ email, nome, telefone })
    return  { jogador }
  }

  @Get("detalhes")
  public async encontrarPorEmail(
    @Query("email", ValidacaoParametrosPipe) email: string,
    @Res() response: Response
  ){
    const jogador = await this.jogadoresService.encontrarPorEmail(email);

    if(!jogador){
      return response.status(404).json({ message: "Jogador não encontrado"})
    }

    return response.json({ jogador })
  }

  @Get(":id")
  public async encontrarPorId(
    @Param("id", ValidacaoParametrosPipe) id: string,
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

  @Patch(":id")
  public async atualizar(
    @Param("id", ValidacaoParametrosPipe) id: string,
    @Body() jogadorDados: EditarJogadorDTO
  ){
    return this.jogadoresService.update({
      id,
      ...jogadorDados
    });
  }

  @Delete(":id")
  public async deletar(@Param("id", ValidacaoParametrosPipe) id: string){
    return this.jogadoresService.deletar(id);
  }

}
