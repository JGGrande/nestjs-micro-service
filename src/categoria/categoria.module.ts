import { Module } from '@nestjs/common';
import { CategoriaController } from './categoria.controller';
import { CategoriaService } from './categoria.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriaSchema } from './model/categoria.schema';
import { JogadoresModule } from 'src/jogadores/jogadores.module';

@Module({
  imports: [
    MongooseModule.forFeature([{
     name: 'Categoria',
     schema: CategoriaSchema
   }]),
   JogadoresModule
 ],
  controllers: [ CategoriaController ],
  providers: [ CategoriaService ],
  exports: [ CategoriaService ]
})
export class CategoriaModule {}
