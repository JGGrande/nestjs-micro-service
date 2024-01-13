import { Injectable, Logger } from '@nestjs/common';
import { ICriarJogadorDTO } from './dtos/criar-jogador.dto';
import { Jogador } from './model/jogador.model';
import { randomUUID } from 'crypto';

@Injectable()
export class JogadoresService {

  private readonly logger = new Logger(JogadoresService.name)
  private jogadores: Jogador[] = []

  async criar({ email, nome, telefone }:ICriarJogadorDTO): Promise<Jogador>{
    this.logger.log(`criado jogador: ${nome}, ${ email } ${ telefone}`);

    const jogador = new Jogador({
      _id: randomUUID(),
      email,
      nome,
      telefone,
      posicaoRanking: null,
      ranking: null,
      urlFotoJogador: null,
    })

    this.jogadores.push(jogador);

    return jogador;
  }

  async encontrarPorId(id: string): Promise<Jogador | null>{
    const jogador = this.jogadores.find(jogador => jogador.id === id);

    if(!jogador) return null;

    return jogador;
  }

  async encontrarPorEmail(email: string): Promise<Jogador | null>{
    const jogador = this.jogadores.find(jogador => jogador.email === email);

    if(!jogador) return null;

    return jogador;
  }

  async encontrarTodos(): Promise<Jogador[]>{
    return this.jogadores
  }

}
