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

  @Column({ nullable: false, default: '' })
  phone_number: string;

  @Column({ nullable: false, default: '' })
  location: string;

  @ManyToMany(() => User, (user) => user.businesses)
  @JoinTable()
  users: User[];

  @OneToOne(() => Book, (book) => book.business, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  book: Book;

  // Relación One-to-One con Datafono
  @OneToOne(() => Datafono, (datafono) => datafono.business, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  datafono: Datafono;
}
