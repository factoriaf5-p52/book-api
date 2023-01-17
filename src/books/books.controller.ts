import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(@Query('sort') sort?: string) {
    const params = [];
    if (sort != undefined) {
      params.push(`${sort}`);
    }
    return this.booksService.findAll(params);
  }

  @Get(':bookId')
  findBook(@Param('bookId') bookId: string) {
    return this.booksService.findBook(bookId);
  }

  @Post()
  createBook(@Body() body) {
    const newBook: any = body;
    return this.booksService.createBook(newBook);
  }
}
