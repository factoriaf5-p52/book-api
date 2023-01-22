import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
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

describe('BooksService', () => {
  let service: BooksService;
  let model: typeof booksModel;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken('Book'),
          useValue: booksModel,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    model = module.get(getModelToken('Book'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return all books', async () => {
    const result = await service.findAll();
    expect(result).toMatchObject({ data });
    expect(model.find).toHaveBeenCalledTimes(1);
  });
});
