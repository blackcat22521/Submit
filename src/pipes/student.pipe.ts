import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class StudentPipe
  implements PipeTransform<{ studentName: string; className: string }>
{
  transform(value: { studentName: string; className: string }) {
    const { studentName, className } = value;

    if (!studentName || studentName.trim() === '') {
      throw new HttpException(
        {
          errorCode: 'BAD_REQUEST_INPUT',
          devMessage: 'studentName is required.',
          data: { field: 'studentName' },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!className || className.trim() === '') {
      throw new HttpException(
        {
          errorCode: 'BAD_REQUEST_INPUT',
          devMessage: 'className is required.',
          data: { field: 'className' },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return value; // Trả về dữ liệu đã validate
  }
}
