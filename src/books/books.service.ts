import { Injectable } from '@nestjs/common';

interface Params {
  sort?: string;
  limit?: string;
}

@Injectable()
export class BooksService {
  //   findAll(params: Array<string>): any {
  //     if (params.length > 0) {
  //       return `findAll working with ${params}`;
  //     } else {
  //       return 'findAll working';
  //     }
  //   }
  findAll(params?: Params): any {
    let sort: string, limit: string;
    if (params !== undefined) ({ sort, limit } = params);
    let msg = 'findAll working';
    if (sort) msg = msg.concat(` with ${sort}`);
    if (limit) msg = msg.concat(` with ${limit}`);

    return msg;
  }

  findBook(bookId: string) {
    return `findBook working with bookId:${bookId}`;
  }

  createBook(newBook: any) {
    return newBook;
  }

  deleteBook(bookId: string) {
    return `deleted with bookId: ${bookId}`;
  }

  updateBook(bookId: string, newBook: any) {
    return `updated book: ${bookId} with ${JSON.stringify(newBook)}`;
  }
}
