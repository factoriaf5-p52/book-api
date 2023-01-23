import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  //   findAll(@Query('sort') sort?: string) {
  //     const params = [];
  //     if (sort != undefined) {
  //       params.push(`${sort}`);
  //     }
  //     return this.booksService.findAll(params);
  //   }
  findAll(@Query() params?: any) {
    return this.booksService.findAll(params);
  }

  @Get(':bookId')
  findBook(@Param('bookId') bookId: string) {
    return this.booksService.findBook(bookId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createBook(@Body() newBook: CreateBookDto) {
    // const newBook: any = body;
    return this.booksService.createBook(newBook);
  }

  @Delete(':bookId')
  deleteBook(@Param('bookId') bookId: string) {
    return this.booksService.deleteBook(bookId);
  }

  @Put(':bookId')
  updateBook(@Body() newBook: UpdateBookDto, @Param('bookId') bookId: string) {
    // const newBook: any = body;
    return this.booksService.updateBook(bookId, newBook);
  }
}
