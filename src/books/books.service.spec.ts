import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('findAll should return "findAll working"', () => {
    expect(service.findAll([])).toBe('findAll working');
  });
  it('findAll with query param sort = 1 should return "findAll working with 1"', () => {
    expect(service.findAll(['1'])).toBe('findAll working with 1');
  });
  it('findBook should return "findBook working with bookId:5"', () => {
    expect(service.findBook('5')).toBe('findBook working with bookId:5');
  });
  it('createBook(newBook) should return newBook', () => {
    const newBook = {
      info: 'info',
    };
    expect(service.createBook(newBook)).toBe(newBook);
  });
});
