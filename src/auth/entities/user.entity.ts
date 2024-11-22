import { Business } from 'business/entities/business.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false, default: '' })
  firstname: string;

  @Column({ nullable: false, default: '' })
  lastname: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: 'admin' | 'user';

  @ManyToMany(() => Business, (business) => business.users)
  businesses: Business[];
}
