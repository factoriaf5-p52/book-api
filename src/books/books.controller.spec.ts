import { AuthGuard } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';

const books: Book[] = [
  {
    id: 1,
    title: 'a',
    author: 'a',
    description: 'a',
  },
  {
    id: 2,
    title: 'b',
    author: 'b',
    description: 'b',
  },
];

describe('BooksController', () => {
  let controller: BooksController;
  const mockBookService = {
    findAll: jest.fn().mockImplementation((params) => {
      if (params?.sort == 1)
        return Promise.resolve(
          structuredClone(books).sort((a, b) => {
            if (a.title > b.title) {
              return -1;
            } else {
              return 1;
            }
          }),
        );

      return Promise.resolve({ books });
    }),
    findBook: jest.fn().mockImplementation((bookId) => {
      // const { id } = condition.where;
      return Promise.resolve(books.find((e) => e.id == bookId));
    }),
    createBook: jest.fn().mockImplementation((book) => {
      const newBook = {
        id: books.reduce((ac, e) => (ac = ac > e.id ? ac : e.id), 0) + 1,
        ...book,
      };
      books.push(newBook);
      return Promise.resolve(newBook);
    }),
    deleteBook: jest.fn().mockImplementation((bookId) => {
      return Promise.resolve(books.find((e) => e.id == bookId));
    }),
    updateBook: jest.fn().mockImplementation(async (bookId, updatedBook) => {
      const book = await mockBookService.findBook(bookId);
      const newBook = { ...book, ...updatedBook };
      return Promise.resolve(newBook);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue('')
      .overrideProvider(BooksService)
      .useValue(mockBookService)
      .compile();

    controller = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('findAll should return a collection of books', async () => {
    expect(await controller.findAll()).toMatchObject({ books });
  });
  it('findAll(http://demo.com?sort=1) should return an ordered books list', async () => {
    const params = { sort: '1' };
    const dataResponse = structuredClone(books).sort((a, b) => {
      if (a.title > b.title) {
        return -1;
      } else {
        return 1;
      }
    });
    expect(await controller.findAll(params)).toMatchObject(dataResponse);
  });
  it('findBook(1) should return "findBook working with bookId: 1"', async () => {
    expect(await controller.findBook('1')).toMatchObject({ id: 1 });
  });

  it('createBook({title:"newBook"}) should return {title:"newBook"}', async () => {
    const newBook = {
      title: 'newBook',
      author: 'author',
      description: 'desc',
    };
    expect(await controller.createBook(newBook)).toMatchObject({
      id: expect.any(Number),
    });
  });
  it('deleteBook("1") should return deleted with bookId: 1', async () => {
    expect(await controller.deleteBook('1')).toMatchObject({ id: 1 });
  });
  it('updateBook({title:"myBook"},"5") should return the book title', async () => {
    const bookUpdated = { description: 'myBook' };
    const newBook = { ...bookUpdated, id: 1 };
    expect(await controller.updateBook(bookUpdated, '1')).toMatchObject(
      newBook,
    );
  });
});
