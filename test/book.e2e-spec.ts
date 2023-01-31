import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { BooksModule } from '../src/books/books.module';
import { Book } from '../src/books/entities/book.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const data: Book[] = [
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

const mockBookRepository = {
  find: jest.fn().mockResolvedValue({ data }),
};

describe('/book', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BooksModule],
      providers: [
        {
          provide: getRepositoryToken(Book),
          useValue: mockBookRepository,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    // app.setGlobalPrefix('api/v1');
    await app.init();
  });

  // it('/ (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .expect(200)
  //     .expect('Hello World!');
  // });
  it('/books (GET)', () => {
    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect({ data });
  });
  it('/books (GET)', () => {
    return request(app.getHttpServer())
      .get('/books/1')
      .expect(200)
      .expect('findBook working with bookId:1');
  });
  it('/books (GET)', () => {
    return request(app.getHttpServer())
      .get('/books?sort=1')
      .expect(200)
      .expect('findAll working with 1');
  });
  it('/books (POST)', async () => {
    return request(app.getHttpServer())
      .post('/books')
      .send({ newBook: 'myBook' })
      .expect(201)
      .expect({ newBook: 'myBook' });
    // const response = await request(app.getHttpServer())
    //   .post('/books')
    //   .send({ newBook: 'myBook' });
    // expect(response.statusCode).toBe(201);
    // expect(response).toBe({ newBook: 'myBook' });
  });
});
