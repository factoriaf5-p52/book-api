import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './schemas/book.schema';

const data: Book[] = [
  {
    title: 'a',
    author: 'a',
    description: 'a',
  },
  {
    title: 'b',
    author: 'b',
    description: 'b',
  },
];

const booksModel = {
  findOne: jest.fn(),
  find: jest.fn().mockImplementationOnce(() => ({
    exec: jest.fn().mockResolvedValue({ data }),
  })),
  create: jest.fn(),
};

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;
  let model: typeof booksModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        BooksService,
        {
          provide: getModelToken('Book'),
          useValue: booksModel,
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
    model = module.get(getModelToken('Book'));
  });
  describe('findAll controller', () => {
    it('should  should return a list of all books', async () => {
      const result = await controller.findAll();
      expect(result).toMatchObject({ data });
    });
  });
});
