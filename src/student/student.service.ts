import { Injectable, BadRequestException } from '@nestjs/common';
import { StudentDto } from './dto/StudentDto';
import { ManagementService } from '../management/management.service';

@Injectable()
export class StudentService {
  private students = [];
  private id = 1;

  constructor(private readonly managementService: ManagementService) {}

  // Tạo mới học sinh
  create(studentDto: StudentDto) {
    // Constraint: Student Name không được phép trùng
    if (this.students.some((s) => s.studentName === studentDto.studentName)) {
      throw new BadRequestException('Student name must be unique.');
    }

    // Constraint: 1 HS phải thuộc về 1 class nào đó
    const cls = this.managementService
      .findAll()
      .find((c) => c.className === studentDto.className);

    if (!cls) {
      throw new BadRequestException(
        `Class ${studentDto.className} does not exist.`,
      );
    }

    const newStudent = { id: this.id++, ...studentDto };
    this.students.push(newStudent);
    return newStudent;
  }

  findAll() {
    return this.students;
  }

  findOne(id: number) {
    return this.students.find((s) => s.id === id);
  }

  update(id: number, studentDto: StudentDto) {
    const student = this.findOne(id);
    if (!student) throw new BadRequestException('Student not found.');

    // Constraint: Student Name không được phép trùng khi cập nhật
    if (
      this.students.some(
        (s) => s.studentName === studentDto.studentName && s.id !== id,
      )
    ) {
      throw new BadRequestException('Student name must be unique.');
    }

    // Constraint: 1 HS phải thuộc về 1 class nào đó
    const cls = this.managementService
      .findAll()
      .find((c) => c.className === studentDto.className);

    if (!cls) {
      throw new BadRequestException(
        `Class ${studentDto.className} does not exist.`,
      );
    }

    Object.assign(student, studentDto);
    return student;
  }

  delete(id: number) {
    const index = this.students.findIndex((s) => s.id === id);
    if (index >= 0) {
      this.students.splice(index, 1);
      return { message: 'Student deleted successfully' };
    }
    throw new BadRequestException('Student not found.');
  }
}
