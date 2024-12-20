import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Kích hoạt global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Loại bỏ các field không có trong DTO
      forbidNonWhitelisted: true, // Cấm gửi field không có trong DTO
      transform: true, // Tự động chuyển đổi kiểu dữ liệu
    }),
  );

  await app.listen(3000);
  console.log('Server is running on http://localhost:3000');
}
bootstrap();
