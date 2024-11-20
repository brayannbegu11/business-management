import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatafonoService } from './datafono.service';
import { DatafonoController } from './datafono.controller';
import { Datafono } from './entities/datafono.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Datafono])],
  providers: [DatafonoService],
  controllers: [DatafonoController],
})
export class DatafonoModule {}
