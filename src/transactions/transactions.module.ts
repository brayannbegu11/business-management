import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transactions.entity';
import { JwtModule } from '@nestjs/jwt';
import { TransactionService } from './transactions.service';
import { TransactionController } from './transactions.controller';
import { BookModule } from 'book/book.module';
import { AuthModule } from 'auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    JwtModule,
    BookModule,
    AuthModule,
  ],
  exports: [TypeOrmModule],
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}
