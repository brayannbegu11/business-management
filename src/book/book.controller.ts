import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './entities/book.entity';

@Controller('book')
export class BookController {
  constructor(private readonly bookservice: BookService) {}

  // Create Book record
  @Post()
  async create(@Body() bookData: Book) {
    return this.bookservice.createBook(bookData);
  }

  // Get the records
  @Get('business/:businessId')
  async getBooksByBusiness(@Param('businessId') businessId: string) {
    return this.bookservice.getBooksByBusiness(businessId);
  }
}
