import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Note } from '../entities/note.entity';
import { CreateDto, UpdateDto } from './dto';


@Controller('rest/noteboard')
export class NoteController {
  constructor() {}

  @Get()
  getAllNotes(): string {
    return "All todo";
  }

  @Get(':id')
  getNoteById(@Param('id') id:string): string {
    return "one todo" + id;
  }

  @Post()
  createNote(@Body() note: CreateDto): CreateDto {
    console.log('search by id')
    console.log(note, 'saved');
    return note;
  }

  @Put(':id')
  saveNote(
    @Param('id') id:string, 
    @Body() note: UpdateDto
    ): UpdateDto {
    console.log(id);
    console.log(note);
    return note;
  }

  @Delete(':id')
  deleteNote(@Param('id') id:string): string {
    return "delete by " + id;
  }
}
