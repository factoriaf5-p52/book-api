import { Controller, Get, Param } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':bookId')
  findBook(@Param('bookId') bookId: string) {
    return this.booksService.findBook(bookId);
  }
}
