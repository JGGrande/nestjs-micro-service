import { Module } from '@nestjs/common';
import { DesafiosController } from './desafios.controller';
import { DesafiosService } from './desafios.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DesafioSchema } from './model/Desafio.schema';
import { JogadoresModule } from 'src/jogadores/jogadores.module';
import { CategoriaModule } from 'src/categoria/categoria.module';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Desafio',
      schema: DesafioSchema
    }]),
    JogadoresModule,
    CategoriaModule
  ],
  controllers: [ DesafiosController ],
  providers: [ DesafiosService ]
})
export class DesafiosModule {}
