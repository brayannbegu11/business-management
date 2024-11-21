import { Business } from 'business/entities/business.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, default: () => 'CURRENT_DATE' })
  date: string;

  @Column({ nullable: false, default: '' })
  description: string;

  @Column({ nullable: false, default: '' })
  category: string;

  @Column({ nullable: false, default: 0 })
  value: number;

  @Column({ nullable: false, default: 0 })
  balance: number;

  @OneToOne(() => Business, (business) => business.book)
  @JoinColumn()
  business: Business;
}
