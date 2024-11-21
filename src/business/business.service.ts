import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Business } from './entities/business.entity';
import { Repository } from 'typeorm';
import { User } from 'auth/entities/user.entity';
import { Book } from 'book/entities/book.entity';
import { Datafono } from 'datafono/entities/datafono.entity';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    @InjectRepository(Datafono)
    private readonly datafonoRepository: Repository<Datafono>,
  ) {}

  // Create business (With book and datafono)
  async createBusiness(name: string, userId: number): Promise<Business> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    const newBusiness = this.businessRepository.create({ name, user });
    const savedBusiness = await this.businessRepository.save(newBusiness);

    // Create book
    const book = this.bookRepository.create({
      business: savedBusiness,
    });
    await this.bookRepository.save(book);

    savedBusiness.book = book;

    // Create Datafono
    const datafono = this.datafonoRepository.create({
      business: savedBusiness,
    });
    await this.datafonoRepository.save(datafono);

    savedBusiness.datafono = datafono;
    return this.businessRepository.save(savedBusiness);
  }

  // Get all the business
  async findAll(): Promise<Business[]> {
    return this.businessRepository.find({
      relations: ['user', 'book', 'datafono'],
    });
  }

  // Get business for id
  async findOne(id: number): Promise<Business> {
    return this.businessRepository.findOne({
      where: { id },
      relations: ['user', 'book', 'datafono'],
    });
  }

  // Update a business
  async updateBusiness(id: number, name: string): Promise<Business> {
    const business = await this.findOne(id);
    business.name = name;
    return this.businessRepository.save(business);
  }

  // Delete a business
  async deleteBusiness(id: number): Promise<void> {
    await this.businessRepository.delete(id);
  }
}
