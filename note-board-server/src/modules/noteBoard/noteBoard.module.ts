import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteController } from './controllers/note.controller';
import { Note } from './entities/note.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  controllers: [NoteController],
  providers: [],
})
export class NoteBoardModule {}
