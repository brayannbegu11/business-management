import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DatafonoService } from './datafono.service';
import { Datafono } from './entities/datafono.entity';
import { JwtGuard } from 'auth/jwt/jwt.guard';

@Controller('datafono')
export class DatafonoController {
  constructor(private readonly bookservice: DatafonoService) {}

  // Create Book record
  @Post()
  @UseGuards(JwtGuard)
  async create(@Body() datafonoData: Datafono) {
    return this.bookservice.createBook(datafonoData);
  }

  // Get the records
  @Get('datafono/:businessId')
  @UseGuards(JwtGuard)
  async getDatafonoByBusiness(@Param('businessId') businessId: string) {
    return this.bookservice.getDatafonoByBusiness(businessId);
  }

  @Delete('datafono/:datafonoId')
  @UseGuards(JwtGuard)
  async deleteBook(@Param('datafonoId') datafonoId: number) {
    return this.bookservice.deleteDatafono(datafonoId);
  }
}
