import { Controller, Post, Get, UseInterceptors, UploadedFile, Body, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

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
  async createAttendance(
    @UploadedFile() file: any,
    @Body() createAttendanceDto: CreateAttendanceDto
  ) {
    const userId = parseInt(createAttendanceDto.userId, 10);
    const photoPath = file.path;

    return this.attendanceService.createRecord(userId, photoPath);
  }

  @Get()
  async getAllAttendance(@Query('userId') userId?: string) {
    return this.attendanceService.findAll(userId ? parseInt(userId, 10) : undefined);
  }
}