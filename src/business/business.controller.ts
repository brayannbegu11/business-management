import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BusinessService } from './business.service';
import { Business } from './entities/business.entity';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  // Create a business
  @Post()
  async create(
    @Body() body: { name: string; userId: number },
  ): Promise<Business> {
    const { name, userId } = body;
    return this.businessService.createBusiness(name, userId);
  }

  // Get all the business
  @Get()
  async findAll(): Promise<Business[]> {
    return this.businessService.findAll();
  }

  // Get business by ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Business> {
    return this.businessService.findOne(id);
  }

  // Update the business
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() body: { name: string },
  ): Promise<Business> {
    const { name } = body;
    return this.businessService.updateBusiness(id, name);
  }

  // Delete a business

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.businessService.deleteBusiness(id);
  }
}
