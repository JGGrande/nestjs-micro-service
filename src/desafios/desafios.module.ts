import { Module } from '@nestjs/common';
import { DesafiosController } from './desafios.controller';
import { DesafiosService } from './desafios.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DesafioSchema } from './model/Desafio.schema';
import { JogadoresModule } from 'src/jogadores/jogadores.module';
import { CategoriaModule } from 'src/categoria/categoria.module';
import { MongosseDesafioRepository } from './implementations/MongosseDesafioRepository';
import { PartidasModule } from 'src/partidas/partidas.module';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Desafio',
      schema: DesafioSchema
    }]),
    JogadoresModule,
    CategoriaModule,
    PartidasModule
  ],
  controllers: [ DesafiosController  ],
  providers: [
    DesafiosService,
    {
      provide: 'DesafioRepository',
      useClass: MongosseDesafioRepository
    }
  ]
})
export class DesafiosModule {}
