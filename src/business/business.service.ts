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
  async createBusiness(
    name: string,
    phone_number: string,
    location: string,
    userIds: number[],
  ): Promise<Business> {
    const newBusiness = this.businessRepository.create({
      name,
      phone_number,
      location,
    });
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
    businessId: string,
    userIds: number,
  ): Promise<Business> {
    const business = await this.businessRepository.findOne({
      where: { id: parseInt(businessId) },
      relations: ['users'],
    });
    if (!business) {
      throw new Error('Negocio no encontrado');
    }
    const userToAdd = await this.userRepository.find({
      where: { id: userIds },
    });
    if (!userToAdd.length) {
      throw new Error('Usuarios no encontrados');
    }
    const existingUserIds = business.users.map((user) => user.id);
    const newUsers = userToAdd.filter(
      (user) => !existingUserIds.includes(user.id),
    );
    if (!newUsers.length) {
      throw new Error('Todos los usuarios ya están asignados a este negocio');
    }

    business.users = [...business.users, ...newUsers];

    return this.businessRepository.save(business);
  }

  // Get all the businesses
  async findAll(): Promise<Business[]> {
    return this.businessRepository.find({
      relations: ['users', 'book', 'datafono'],
    });
  }

  //Get business by user
  async findBusinessByUser(userId: number) {
    const data = await this.businessRepository.find({
      relations: ['users', 'book', 'datafono'], // Carga la relación users
      where: {
        users: {
          id: userId,
        },
      },
    });

    console.log('Negocios:', data);
    return data;
  }

  // Get business for id
  async findOne(id: number): Promise<Business> {
    return this.businessRepository.findOne({
      where: { id },
      relations: ['users', 'book', 'datafono'],
    });
  }

  // Update a business
  async updateBusiness(
    id: number,
    name: string,
    phone_number: string,
    location: string,
  ): Promise<Business> {
    const business = await this.findOne(id);
    business.name = name;
    business.location = location;
    business.phone_number = phone_number;
    return this.businessRepository.save(business);
  }

  // Delete a business
  async deleteBusiness(id: number): Promise<void> {
    await this.businessRepository.delete(id);
  }
}
