import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';

describe('BooksController', () => {
  let controller: BooksController;
  const mockBookService = {
    findAll:jest.fn(),
    findOne:jest.fn(),
    delete:jest.fn(),
    update:jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    })
      .overrideProvider(BooksService)
      .useValue(mockBookService)
      .compile();

    controller = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('findAll should return "findAll working"', () => {
    // expect(controller.findAll()).toBe('findAll working');
  });
  it('findAll(http://demo.com?sort=1)', () => {
    const params = { sort: '1' };
    expect(controller.findAll(params)).toBe('findAll working with 1');
  });
  it('findBook(5) should return "findBook working with bookId:5"', () => {
    expect(controller.findBook('5')).toBe('findBook working with bookId:5');
  });
  it('createBook({title:"newBook"}) should return {title:"newBook"}', () => {
    const newBook = {
      title: 'newBook',
      author: 'author',
      description: 'desc',
    };
    expect(controller.createBook(newBook)).toBeInstanceOf(Book);
  });
  it('deleteBook("5") should return deleted with bookId: 5', () => {
    expect(controller.deleteBook('5')).toContain('5');
  });
  it('updateBook({title:"myBook"},"5") should return the book title', () => {
    const bookUpdated = { description: 'myBook' };
    expect(controller.updateBook(bookUpdated, '5')).toContain('myBook');
  });
});
