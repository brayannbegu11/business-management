import { Business } from 'business/entities/business.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column()
  value: number;

  @OneToOne(() => Business, (business) => business.book)
  business: Business;
}
