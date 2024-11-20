import { Book } from 'book/entities/book.entity';
import { Datafono } from 'datafono/entities/datafono.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: 'admin' | 'user';

  @OneToMany(() => Book, (book) => book.user) // Relación uno a muchos con la tabla Book
  books: Book[];

  @OneToMany(() => Datafono, (datafono) => datafono.user) // Relación uno a muchos con la tabla Book
  datafonos: Datafono[];
}
