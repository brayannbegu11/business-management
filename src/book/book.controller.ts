import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './entities/book.entity';
import { JwtGuard } from 'auth/jwt/jwt.guard';

@Controller('book')
export class BookController {
  constructor(private readonly bookservice: BookService) {}

  // Create Book record
  @Post()
  @UseGuards(JwtGuard)
  async create(@Body() bookData: Book) {
    return this.bookservice.createBook(bookData);
  }

  // Get the records
  @Get('books/:businessId')
  @UseGuards(JwtGuard)
  async getBooksByBusiness(@Param('businessId') businessId: string) {
    return this.bookservice.getBooksByBusiness(businessId);
  }

  @Delete('books/:bookid')
  @UseGuards(JwtGuard)
  async deleteBook(@Param('bookId') bookId: number) {
    return this.bookservice.deleteBook(bookId);
  }
}
