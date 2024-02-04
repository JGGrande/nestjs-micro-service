import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { IPartida } from './model/IPartida';
import { CriarPartidaDTO } from './dtos/criar-partida.dto';

@Injectable()
export class PartidasService {

  constructor(
    @InjectModel("Partida")
    private readonly partidaModel: Model<IPartida>
  ) { }

  async criar({ categoria, def, jogadores, resultado }: CriarPartidaDTO, session?: ClientSession): Promise<IPartida> {
    const partida = new this.partidaModel({
      categoria,
      def,
      jogadores,
      resultado
    }, { session });

    await partida.save()

    return partida
  }

}
