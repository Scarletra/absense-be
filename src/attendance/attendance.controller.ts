import { Controller, Post, Get, UseInterceptors, UploadedFile, Body, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AttendanceService } from './attendance.service';

@Controller('api/attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

 @Post()
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async createAttendance(@UploadedFile() file: any, @Body() body: any) {
    const userId = body.userId;
    const photoPath = file.path;
    
    return this.attendanceService.createRecord(userId, photoPath);
  }

  @Get()
  async getAllAttendance() {
    return this.attendanceService.findAll();
  }
}