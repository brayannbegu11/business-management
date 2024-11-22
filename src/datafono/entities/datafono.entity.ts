import { Business } from 'business/entities/business.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('datafonos')
export class Datafono {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, default: () => 'CURRENT_DATE' })
  date: string;

  @Column({ nullable: false, default: '' })
  category: string;

  @Column({ nullable: false, default: 0 })
  value: number;

  @OneToOne(() => Business, (business) => business.datafono, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  business: Business;
}
