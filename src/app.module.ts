import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://admin:Rvo6KN0FSp7Jj6ZW@nestjs.paljb0y.mongodb.net/?retryWrites=true&w=majority"
    ),
    JogadoresModule
  ],
  controllers: [ ],
  providers: [ ],
})
export class AppModule {}
