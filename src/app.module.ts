import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StudentModule } from './student/student.module';
import { ManagementModule } from './management/management.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Cấu hình môi trường toàn cục
    StudentModule.forRoot(), // Import Student Module
    ManagementModule.forRoot(), // Import Management Module
  ],
  controllers: [AppController], // Controller chính
  providers: [AppService], // Service chính
})
export class AppModule {}
