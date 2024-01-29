import { Body, Controller, Post } from '@nestjs/common';
import { DesafiosService } from './desafios.service';
import { CriarDesafioDTO } from './dtos/criar-desadio.dto';
import { IDesafio } from './model/IDesafio';

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

  async listarTodos(): Promise<IDesafio[]>{
    return this.desafiosService.listarTodos();
  }

}
