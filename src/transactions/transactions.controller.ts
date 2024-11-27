import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TransactionService } from './transactions.service';

@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post(':bookId')
  createTransaction(
    @Param('bookId') bookId: number,
    @Body() transactionData: any,
  ) {
    return this.transactionService.createTransaction(bookId, transactionData);
  }

  @Get(':bookId')
  getBookTransactions(@Param('bookId') bookId: number) {
    return this.transactionService.getBookTransactions(bookId);
  }
}
