import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}
  // Create register
  async createBook(data: Partial<Book>) {
    const book = this.bookRepository.create(data);
    return this.bookRepository.save(book);
  }

  // get registers from the book
  async getBooksByBusiness(businessId: string) {
    return this.bookRepository.findOne({
      where: {
        business: {
          id: parseInt(businessId, 10),
        },
      },
    });
  }
}
