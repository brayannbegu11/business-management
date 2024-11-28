import { Book } from 'book/entities/book.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bookTransactions')
export class BookTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', nullable: false })
  date: Date;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  category: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  value: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  runningBalance: number;

  @ManyToOne(() => Book, (book) => book.bookTransactions)
  book: Book;
}
