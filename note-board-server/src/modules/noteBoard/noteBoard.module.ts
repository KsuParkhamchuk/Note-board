import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteController } from './controllers/note.controller';
import { Note } from './entities/note.entity';
import { NoteService } from './services/note.service';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteBoardModule {}
