import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Datafono } from './entities/datafono.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DatafonoService {
  constructor(
    @InjectRepository(Datafono)
    private readonly datafonoRepository: Repository<Datafono>,
  ) {}
  // Create register
  async createBook(data: Partial<Datafono>) {
    const datafono = this.datafonoRepository.create(data);
    return this.datafonoRepository.save(datafono);
  }

  // get registers from business
  async getDatafonoByBusiness(businessId: string) {
    return this.datafonoRepository.findOne({
      where: {
        business: {
          id: parseInt(businessId, 10),
        },
      },
    });
  }
  async deleteDatafono(id: number): Promise<void> {
    await this.datafonoRepository.delete(id);
  }
}
