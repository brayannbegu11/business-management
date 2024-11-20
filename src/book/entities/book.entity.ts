import { User } from 'auth/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne(() => User, (user) => user.books)
  user: User;

  @Column()
  businessId: string;
}
