import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import * as querystring from 'node:querystring';

describe('BooksController', () => {
  let controller: BooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    }).compile();

    controller = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('findAll should return "findAll working"', () => {
    expect(controller.findAll()).toBe('findAll working');
  });
  it('findAll(http://demo.com?sort=1)', () => {
    const params = { sort: '1' };
    expect(controller.findAll(params)).toBe('findAll working with 1');
  });
  it('findBook(5) should return "findBook working with bookId:5"', () => {
    expect(controller.findBook('5')).toBe('findBook working with bookId:5');
  });
  it('createBook(newBook) should return newBook', () => {
    const newBook = {
      info: 'info',
    };
    expect(controller.createBook(newBook)).toBe(newBook);
  });
});
