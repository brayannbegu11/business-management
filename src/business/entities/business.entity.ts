import { User } from 'auth/entities/user.entity';
import { Book } from 'book/entities/book.entity';
import { Datafono } from 'datafono/entities/datafono.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Business {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.businesses)
  user: User;

  @OneToOne(() => Book, (book) => book.business)
  @JoinColumn()
  book: Book;

  // Relación One-to-One con Datafono
  @OneToOne(() => Datafono, (datafono) => datafono.business)
  @JoinColumn()
  datafono: Datafono;
}
