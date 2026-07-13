import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AttendanceModule } from './attendance/attendance.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';
import { Attendance } from './attendance/entities/attendance.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'absense_db',
      entities: [User, Attendance],
      synchronize: true,
    }),
    UsersModule,
    AttendanceModule,
    AuthModule,
  ],
})
export class AppModule {}