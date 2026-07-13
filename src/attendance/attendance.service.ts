import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './entities/attendance.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepo: Repository<Attendance>,
  ) {}

  async createRecord(userId: number, photoPath: string) {
    const currentTime = new Date();

    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();

    const isPresent =
      (hour > 6 && hour < 9) ||
      (hour === 6) ||
      (hour === 9 && minute === 0);

    const status = isPresent ? 'Hadir' : 'Terlambat';

    const record = this.attendanceRepo.create({
      user: { id: userId },
      photoPath,
      status,
    });

    return this.attendanceRepo.save(record);
  }

  async findAll(userId?: number) {
    return this.attendanceRepo.find({
      where: userId ? { user: { id: userId } } : {},
      relations: {
        user: true
      },
      order: {
        timestamp: 'DESC'
      }
    });
  }
}