import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from '../entities/note.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}

  findAll(): Promise<Note[]> {
    return this.noteRepository.find();
  }

  findOne(id: string): Promise<Note> {
    return this.noteRepository.findOne(id);
  }

  create(note: Note): Promise<Note> {
    delete note.id;
    return this.noteRepository.save(note);
  }

  update(note: Note): Promise<Note> {
    return this.noteRepository.save(note);
  }

  async remove(id: string): Promise<void> {
    await this.noteRepository.delete(id);
  }
}
