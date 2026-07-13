import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Attendance } from '../../attendance/entities/attendance.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  nip!: string;

  @Column()
  name!: string;

  @Column()
  passwordHash!: string;

  @Column({ default: false })
  isHrd!: boolean;

  @OneToMany(() => Attendance, (attendance) => attendance.user)
  attendances!: Attendance[];

  @CreateDateColumn()
  createdAt!: Date;
}