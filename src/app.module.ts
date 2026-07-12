import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AttendanceModule } from './attendance/attendance.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, AttendanceModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
