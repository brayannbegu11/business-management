import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transactions.entity';
import { Book } from 'book/entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async createTransaction(
    bookId: number,
    transactionData: {
      date: Date;
      description: string;
      category: string;
      value: number;
    },
  ) {
    // Find the last transaction for this book to get the previous balance
    const lastTransaction = await this.transactionRepository.findOne({
      where: { book: { id: bookId } },
      order: { date: 'DESC', id: 'DESC' },
    });

    // Calculate running balance
    const previousBalance = lastTransaction
      ? lastTransaction.runningBalance
      : 0;
    const runningBalance = this.calculateRunningBalance(
      previousBalance,
      transactionData.category,
      transactionData.value,
    );

    // Create transaction
    const transaction = this.transactionRepository.create({
      ...transactionData,
      book: { id: bookId },
      runningBalance,
    });

    return this.transactionRepository.save(transaction);
  }

  private calculateRunningBalance(
    previousBalance: number,
    category: string,
    value: number,
  ): number {
    switch (category) {
      case 'venta':
        return previousBalance + value;
      case 'compra':
      case 'gasto':
        return previousBalance - value;
      default:
        return previousBalance;
    }
  }

  async getBookTransactions(bookId: number) {
    return this.transactionRepository.find({
      where: { book: { id: bookId } },
      order: { date: 'ASC', id: 'ASC' },
    });
  }
}
