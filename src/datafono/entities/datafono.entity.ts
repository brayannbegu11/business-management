import { User } from 'auth/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('datafonos')
export class Datafono {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  category: string;

  @Column('decimal')
  value: number;

  @ManyToOne(() => User, (user) => user.datafonos)
  user: User;

  @Column()
  businessId: string; // Relacionado al negocio
}
