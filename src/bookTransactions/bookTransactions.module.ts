import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookTransaction } from './entities/bookTransactions.entity';
import { JwtModule } from '@nestjs/jwt';
import { BookTransactionService } from './bookTransactions.service';
import { BookTransactionController } from './bookTransactions.controller';
import { BookModule } from 'book/book.module';
import { AuthModule } from 'auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookTransaction]),
    JwtModule,
    BookModule,
    AuthModule,
  ],
  exports: [TypeOrmModule],
  providers: [BookTransactionService],
  controllers: [BookTransactionController],
})
export class BookTransactionModule {}
