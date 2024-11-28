import { Business } from 'business/entities/business.entity';
import { BookTransaction } from 'bookTransactions/entities/bookTransactions.entity';
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

  @OneToMany(() => BookTransaction, (transaction) => transaction.book)
  bookTransactions: BookTransaction[];

  @OneToOne(() => Business, (business) => business.book, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  business: Business;
}
