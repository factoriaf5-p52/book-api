import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

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
  it('should return "findAll working"', () => {
    expect(controller.findAll()).toBe('findAll working');
  });
  it('should return "findBook working with bookId:5"', () => {
    expect(controller.findBook('5')).toBe('findBook working with bookId:5');
  });
});
