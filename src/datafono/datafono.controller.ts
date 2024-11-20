import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DatafonoService } from './datafono.service';
import { Datafono } from './entities/datafono.entity';

@Controller('datafono')
export class DatafonoController {
  constructor(private readonly bookservice: DatafonoService) {}

  // Create Book record
  @Post()
  async create(@Body() datafonoData: Datafono) {
    return this.bookservice.createBook(datafonoData);
  }

  // Get the records
  @Get('business/:businessId')
  async getDatafonoByBusiness(@Param('businessId') businessId: string) {
    return this.bookservice.getDatafonoByBusiness(businessId);
  }
}
