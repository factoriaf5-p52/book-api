import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { BooksService } from './books/books.service';
// import { BooksController } from './books/books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { LoginController } from './auth/login.controller';
import { Encrypt } from './tools/encrypt.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'books',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
    BooksModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, Encrypt],
})
export class AppModule {}
