import { Module } from '@nestjs/common';
import { PartidasService } from './partidas.service';
import { PartidasController } from './partidas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PartidaSchema } from './model/Partida.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Partida',
      schema: PartidaSchema
    }])
  ],
  providers: [ PartidasService ],
  controllers: [ PartidasController ],
  exports: [ PartidasService ]
})
export class PartidasModule {}
