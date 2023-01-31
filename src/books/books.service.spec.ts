import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

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

describe('BooksService', () => {
  let service: BooksService;
  const mockBookRepository = {
    find: jest.fn().mockImplementation((queryConditions) => {
      if (queryConditions?.order?.title == 'DESC')
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
    findOne: jest.fn().mockImplementation((condition) => {
      const { id } = condition.where;
      return Promise.resolve(books.find((e) => e.id == id));
    }),
    save: jest.fn().mockImplementation((book) => {
      const newBook = {
        id: books.reduce((ac, e) => (ac = ac > e.id ? ac : e.id), 0) + 1,
        ...book,
      };
      books.push(newBook);
      return Promise.resolve(newBook);
    }),
    delete: jest.fn().mockImplementation((condition) => {
      const { id } = condition;
      return Promise.resolve(books.find((e) => e.id == id));
    }),
    update: jest.fn().mockImplementation((updatedBook) => {
      return Promise.resolve(updatedBook);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useValue: mockBookRepository,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('findAll should return "findAll working"', async () => {
    expect(await service.findAll()).toMatchObject({ books });
  });

  it('findAll with query param sort = 1 should return "findAll working with 1"', async () => {
    const dataResponse = structuredClone(books).sort((a, b) => {
      if (a.title > b.title) {
        return -1;
      } else {
        return 1;
      }
    });

    expect(await service.findAll({ sort: '1' })).toMatchObject(dataResponse);
  });

  it('findBook should return a book with id:1', async () => {
    expect(await service.findBook('1')).toMatchObject({
      id: 1,
      title: 'a',
      author: 'a',
      description: 'a',
    });
  });

  it('createBook(newBook) should return newBook', async () => {
    const newBook = {
      title: 'newBook',
      author: 'author',
      description: 'desc',
    };
    expect(await service.createBook(newBook)).toEqual({
      id: expect.any(Number),
      ...newBook,
    });
  });

  it('deleteBook(1) should return book with id:1', async () => {
    expect(await service.deleteBook('1')).toMatchObject({ id: 1 });
  });

  it('updateBook("1",{description:"myBook"}) should return an object Book with the new description', async () => {
    const bookUpdated = { description: 'myBook' };
    expect(await service.updateBook('1', bookUpdated)).toMatchObject({
      description: 'myBook',
    });
  });
});
