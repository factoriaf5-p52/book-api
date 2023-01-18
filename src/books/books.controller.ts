import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';

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

  @Post()
  createBook(@Body() body) {
    const newBook: any = body;
    return this.booksService.createBook(newBook);
  }

  @Delete(':bookId')
  deleteBook(@Param('bookId') id: any) {
    return this.booksService.deleteBook(id);
  }

  @Put(':bookId')
  updateBook(@Body() body:any, @Param('bookId') bookId:any){
    const newBook: any = body;
    return this.booksService.updateBook(bookId, newBook);
  }
}
