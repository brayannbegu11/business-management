import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BookTransactionService } from './bookTransactions.service';
import { JwtGuard } from 'auth/jwt/jwt.guard';

@Controller('bookTransactions')
export class BookTransactionController {
  constructor(private transactionService: BookTransactionService) {}

  @Post(':bookId')
  @UseGuards(JwtGuard)
  createTransaction(
    @Param('bookId') bookId: number,
    @Body() transactionData: any,
  ) {
    return this.transactionService.createTransaction(bookId, transactionData);
  }

  @Get(':bookId')
  @UseGuards(JwtGuard)
  getBookTransactions(@Param('bookId') bookId: number) {
    return this.transactionService.getBookTransactions(bookId);
  }

  @Put(':transactionId')
  @UseGuards(JwtGuard)
  updateTransaction(
    @Param('transactionId') transactionid: number,
    @Body() updateData: any,
  ) {
    return this.transactionService.updateTransaction(transactionid, updateData);
  }
}
