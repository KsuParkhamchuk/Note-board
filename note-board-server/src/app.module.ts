import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoteBoardModule } from './modules/noteBoard/noteBoard.module';

@Module({
  imports: [TypeOrmModule.forRoot(), NoteBoardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
