import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TransformStudentPipe
  implements PipeTransform<{ studentName: string; className: string }>
{
  transform(value: { studentName: string; className: string }) {
    const { className, studentName } = value;

    // Chuyển className và studentName thành chữ viết hoa
    if (className) {
      value.className = className.trim().toUpperCase();
    }

    if (studentName) {
      value.studentName = studentName.trim();
    }

    return value; // Trả về dữ liệu đã được chuyển đổi
  }
}
