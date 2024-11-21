import { Module } from '@nestjs/common';
import { BusinessController } from './business.controller';
import { BusinessService } from './business.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from './entities/business.entity';
import { AuthModule } from 'auth/auth.module';
import { BookModule } from 'book/book.module';
import { DatafonoModule } from 'datafono/datafono.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Business]),
    AuthModule,
    BookModule,
    DatafonoModule,
  ],
  providers: [BusinessService],
  controllers: [BusinessController],
})
export class BusinessModule {}
