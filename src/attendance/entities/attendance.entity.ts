import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('attendances')
export class Attendance {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.attendances)
  user!: User;

  @Column()
  photoPath!: string;

  @Column()
  status!: string;

  @CreateDateColumn()
  timestamp!: Date;
}