import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BusinessService } from './business.service';
import { Business } from './entities/business.entity';
import { JwtGuard } from 'auth/jwt/jwt.guard';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  // Create a business
  @Post()
  // @UseGuards(JwtGuard)
  async create(
    @Body()
    body: {
      name: string;
      phone_number: string;
      location: string;
      userIds: number[];
    },
  ): Promise<Business> {
    const { name, phone_number, location, userIds } = body;
    return this.businessService.createBusiness(
      name,
      phone_number,
      location,
      userIds,
    );
  }

  // Get all the business
  @Get('user/:id')
  @UseGuards(JwtGuard)
  async findBusinessByUser(@Param('id') id: number): Promise<Business[]> {
    return this.businessService.findBusinessByUser(id);
  }

  // Get business by ID
  @Get(':id')
  @UseGuards(JwtGuard)
  async findOne(@Param('id') id: number): Promise<Business> {
    return this.businessService.findOne(id);
  }

  // Update the business
  @Patch(':id')
  @UseGuards(JwtGuard)
  async update(
    @Param('id') id: number,
    @Body() body: { name: string; phone_number: string; location: string },
  ): Promise<Business> {
    const { name, phone_number, location } = body;
    return this.businessService.updateBusiness(
      id,
      name,
      phone_number,
      location,
    );
  }
  // Update: Add Users to the business
  @Patch(':businessId/add-user/')
  @UseGuards(JwtGuard)
  async addUsers(
    @Param('businessId') businessId: string,
    @Body() body: { userId: number },
  ): Promise<Business> {
    const { userId } = body;
    return this.businessService.addUsersToBusiness(businessId, userId);
  }

  // Delete a business

  @Delete(':id')
  @UseGuards(JwtGuard)
  async delete(@Param('id') id: number): Promise<void> {
    return this.businessService.deleteBusiness(id);
  }
}
