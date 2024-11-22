import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book } from './entities/book.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), JwtModule],
  exports: [TypeOrmModule],
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}
