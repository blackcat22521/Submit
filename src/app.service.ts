import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello, welcome to the NestJS Student and Class Management API!';
  }
}
