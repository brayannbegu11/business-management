import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookTransaction } from './entities/bookTransactions.entity';
// import { Book } from 'book/entities/book.entity';
import { DataSource, Repository } from 'typeorm';
import Decimal from 'decimal.js';

@Injectable()
export class BookTransactionService {
  constructor(
    @InjectRepository(BookTransaction)
    private transactionRepository: Repository<BookTransaction>,

    private dataSource: DataSource,
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
    const prevBalance = new Decimal(previousBalance);
    const transactionValue = new Decimal(value);

    switch (category) {
      case 'venta':
      case 'ingreso':
        return prevBalance.plus(transactionValue).toNumber();
      case 'compra':
      case 'gasto':
        return prevBalance.minus(transactionValue).toNumber();
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

  async updateTransaction(transactionId: number, updateData: any) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Get the transaction
      const originalTransaction = await this.transactionRepository.findOne({
        where: { id: transactionId },
        relations: ['book'],
      });

      if (!originalTransaction) {
        throw new Error(`Transaction with ID ${transactionId} not found.`);
      }

      console.log('Original Transaction:', originalTransaction);

      // Update transaction
      const updatedTransaction = await this.transactionRepository.save({
        ...originalTransaction,
        ...updateData,
      });

      console.log('Updated Transaction:', updatedTransaction);

      // Recalculate all subsequent
      const bookTransactions = await this.transactionRepository.find({
        where: { book: { id: originalTransaction.book.id } },
        order: { date: 'ASC', id: 'ASC' },
      });

      const updatedIndex = bookTransactions.findIndex(
        (t) => t.id == transactionId,
      );

      console.log('updatedIndex', updatedIndex);

      // Recalculate running balances from this point
      let previousBalance =
        updatedIndex > 0
          ? bookTransactions[updatedIndex - 1].runningBalance
          : 0;
      for (let i = updatedIndex; i < bookTransactions.length; i++) {
        const transaction = bookTransactions[i];
        console.log('transaction', transaction);
        if (!transaction.category) {
          throw new Error(
            `Transaction with ID ${transaction.id} has no category`,
          );
        }
        previousBalance = this.calculateRunningBalance(
          previousBalance,
          transaction.category,
          transaction.value,
        );

        await this.transactionRepository.save({
          ...transaction,
          runningBalance: previousBalance,
        });
      }

      await queryRunner.commitTransaction();
      return updatedTransaction;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error updating transaction:', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
