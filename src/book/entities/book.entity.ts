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

  @Column({ nullable: false, default: () => 'CURRENT_DATE' }) // Fecha por defecto (fecha actual)
  date: string;

  @Column({ nullable: false, default: '' }) // Descripción predeterminada vacía
  description: string;

  @Column({ nullable: false, default: '' }) // Categoría predeterminada vacía
  category: string;

  @Column({ nullable: false, default: 0 }) // Valor predeterminado de 0
  value: number;

  @Column({ nullable: false, default: 0 }) // Balance predeterminado de 0
  balance: number;

  @OneToOne(() => Business, (business) => business.book)
  @JoinColumn() // Definir que esta es la columna de unión con Business
  business: Business;
}
