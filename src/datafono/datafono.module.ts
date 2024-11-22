import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatafonoService } from './datafono.service';
import { DatafonoController } from './datafono.controller';
import { Datafono } from './entities/datafono.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Datafono]), JwtModule],
  exports: [TypeOrmModule],
  providers: [DatafonoService],
  controllers: [DatafonoController],
})
export class DatafonoModule {}
