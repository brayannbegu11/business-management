import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Business } from './entities/business.entity';
import { In, Repository } from 'typeorm';
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
  async createBusiness(name: string, userIds: number[]): Promise<Business> {
    const newBusiness = this.businessRepository.create({ name });
    const users = await this.userRepository.find({
      where: { id: In(userIds) },
    });
    if (!users.length) {
      throw new Error('No se encontraron usuarios');
    }
    newBusiness.users = users;
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

  // Assign users to business
  async addUsersToBusiness(
    businessId: number,
    userIds: number[],
  ): Promise<Business> {
    const business = await this.businessRepository.findOne({
      where: { id: businessId },
      relations: ['users'],
    });
    if (!business) {
      throw new Error('Negocio no encontrado');
    }
    const usersToAdd = await this.userRepository.find({
      where: { id: In(userIds) },
    });

    business.users = [...business.users, ...usersToAdd];

    return this.businessRepository.save(business);
  }

  // Get all the businesses
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
