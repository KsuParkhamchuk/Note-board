import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Note } from '../entities/note.entity';
import { NoteService } from '../services/note.service';
import { CreateDto, UpdateDto } from './dto';

@Controller('rest/noteboard')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get()
  getAllNotes(): Promise<Note[]> {
    return this.noteService.findAll();
  }

  @Get(':id')
  async getNoteById(@Param('id') id: string): Promise<Note> {
    const note = this.noteService.findOne(id);
    if (note === undefined) {
      throw new HttpException(
        'Note with id = ' + id + ' does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    return note;
  }

  @Post()
  createNote(@Body() createDto: CreateDto): Promise<Note> {
    const note = new Note();
    note.title = createDto.title;
    if (createDto.isCompleted !== undefined) {
      note.isCompleted = createDto.isCompleted;
    }
    return this.noteService.create(note);
  }

  @Put(':id')
  async updateNote(
    @Param('id') id: string,
    @Body() { title, isCompleted = false }: UpdateDto,
  ): Promise<Note | { error: boolean }> {
    const note = await this.noteService.findOne(id);
    if (note === undefined) {
      throw new HttpException(
        'Note with id = ' + id + ' does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    note.title = title;
    note.isCompleted = isCompleted;
    return this.noteService.update(note);
  }

  @Delete(':id')
  deleteNote(@Param('id') id: string): Promise<void> {
    return this.noteService.remove(id);
  }
}
