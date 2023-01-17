import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {
  findAll(): any {
    return 'findAll working';
  }
}
