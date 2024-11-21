import { User } from 'auth/entities/user.entity';
import { Book } from 'book/entities/book.entity';
import { Datafono } from 'datafono/entities/datafono.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Business {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => User, (user) => user.businesses)
  @JoinTable()
  users: User[];

  @OneToOne(() => Book, (book) => book.business)
  @JoinColumn()
  book: Book;

  // Relación One-to-One con Datafono
  @OneToOne(() => Datafono, (datafono) => datafono.business)
  @JoinColumn()
  datafono: Datafono;
}
