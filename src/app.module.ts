import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
// import { EncryptService } from './tools/encrypt.service';
import { ToolsModule } from './tools/tools.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/books'),
    BooksModule,
    UsersModule,
    AuthModule,
    ToolsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
