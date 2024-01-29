import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriaController } from './categoria/categoria.controller';
import { CategoriaService } from './categoria/categoria.service';
import { CategoriaModule } from './categoria/categoria.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://admin:Rvo6KN0FSp7Jj6ZW@nestjs.paljb0y.mongodb.net/?retryWrites=true&w=majority"
    ),
    JogadoresModule,
    CategoriaModule
  ],
  controllers: [ ],
  providers: [ ],
})
export class AppModule {}
