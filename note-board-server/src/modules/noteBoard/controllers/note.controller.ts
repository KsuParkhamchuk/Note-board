import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Note } from '../entities/note.entity';
import { NoteService } from '../services/note.service';
import { CreateDto, UpdateDto } from './dto';
import { NotFoundResponse } from './type';

@ApiTags('note')
@Controller('rest/noteboard')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  
  @Get()
  @ApiResponse( {
    status: 200,
    description: 'Get all notes',
    type: [Note]
  })
  @ApiResponse( {
    status: 404,
    description: 'Not found',
    type: NotFoundResponse
  })
  getAllNotes(): Promise<Note[]> {
    return this.noteService.findAll();
  }

  @Get(':id')
  @ApiResponse( {
    status: 200,
    description: 'Get note by id',
    type: Note
   })
   @ApiResponse( {
    status: 404,
    description: 'Not found',
    type: NotFoundResponse
  })
  async getNoteById(@Param('id') id: string): Promise<Note> {
    const note = await this.noteService.findOne(id);
    if (note === undefined) {
      throw new NotFoundException('Note with id = ' + id + ' does not exists')
    }
    return note;
  }

  @Post()
  @ApiResponse( {
    status: 200,
    description: 'Create note',
    type: Note
  })
  @ApiResponse( {
    status: 404,
    description: 'Not found',
    type: NotFoundResponse
  })
  @ApiBody({ type: CreateDto })
  createNote(@Body() createDto: CreateDto): Promise<Note> {
    const note = new Note();
    note.title = createDto.title;
    if (createDto.isCompleted !== undefined) {
      note.isCompleted = createDto.isCompleted;
    }
    return this.noteService.create(note);
  }

  @Put(':id')
  @ApiResponse( {
    status: 200,
    description: 'Update note',
    type: Note
  })
  @ApiResponse( {
    status: 404,
    description: 'Not found',
    type: NotFoundResponse
  })
  @ApiBody({ type : UpdateDto })
  async updateNote(
    @Param('id') id: string,
    @Body() { title, isCompleted = false }: UpdateDto,
  ): Promise<Note | { error: boolean }> {
    const note = await this.noteService.findOne(id);
    if (note === undefined) {
      throw new NotFoundException('Note with id = ' + id + ' does not exists')
    }
    note.title = title;
    note.isCompleted = isCompleted;
    return this.noteService.update(note);
  }

  @Delete(':id')
  @ApiResponse( {
    status: 200,
    description: 'Detete note',
  })
  deleteNote(@Param('id') id: string): Promise<void> {
    return this.noteService.remove(id);
  }
}
