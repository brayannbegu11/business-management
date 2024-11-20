import { Business } from 'business/entities/business.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity('datafonos')
export class Datafono {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  category: string;

  @Column()
  value: number;

  @OneToOne(() => Business, (business) => business.datafono)
  business: Business;
}
