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
    const cutoffHour = 9; 
    
    const isLate = currentTime.getHours() >= cutoffHour;
    const status = isLate ? 'Terlambat' : 'Hadir';

    const record = this.attendanceRepo.create({
      user: { id: userId },
      photoPath,
      status,
    });
    
    return this.attendanceRepo.save(record);
  }

  async findAll() {
    return this.attendanceRepo.find({ 
      relations: {
        user: true
      },
      order: {
        timestamp: 'DESC'
      }
    });
  }
}