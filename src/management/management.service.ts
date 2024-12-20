import { Injectable, BadRequestException } from '@nestjs/common';
import { ClassDto } from './dto/class.dto';

@Injectable()
export class ManagementService {
  private classes = [];
  private id = 1;

  // Tạo mới lớp học
  create(classDto: ClassDto) {
    // Constraint: Class Name không được phép trùng
    if (this.classes.some((cls) => cls.className === classDto.className)) {
      throw new BadRequestException('Class name must be unique.');
    }

    const newClass = { id: this.id++, ...classDto };
    this.classes.push(newClass);
    return newClass;
  }

  findAll() {
    return this.classes;
  }

  findOne(id: number) {
    return this.classes.find((cls) => cls.id === id);
  }

  update(id: number, classDto: ClassDto) {
    const cls = this.findOne(id);
    if (!cls) throw new BadRequestException('Class not found.');

    // Constraint: Class Name không được phép trùng khi cập nhật
    if (
      this.classes.some(
        (c) => c.className === classDto.className && c.id !== id,
      )
    ) {
      throw new BadRequestException('Class name must be unique.');
    }

    Object.assign(cls, classDto);
    return cls;
  }

  delete(id: number) {
    const index = this.classes.findIndex((cls) => cls.id === id);
    if (index >= 0) {
      this.classes.splice(index, 1);
      return { message: 'Class deleted successfully' };
    }
    throw new BadRequestException('Class not found.');
  }
}
