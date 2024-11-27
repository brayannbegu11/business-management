import { Business } from 'business/entities/business.entity';
import { Transaction } from 'transactions/entities/transactions.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0,
  })
  initialBalance: number;

  @OneToMany(() => Transaction, (transaction) => transaction.book)
  transactions: Transaction[];

  @OneToOne(() => Business, (business) => business.book, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  business: Business;
}
