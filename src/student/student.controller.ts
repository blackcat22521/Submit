import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentDto } from './dto/StudentDto';
import { RoleGuard } from '../guards/guards';
import { SetMetadata, UsePipes, UseInterceptors } from '@nestjs/common';
import { StudentPipe } from 'src/pipes/student.pipe';
import { GlobalInterceptor } from 'src/interceptor/global.interceptor';
@UseInterceptors(GlobalInterceptor)
@Controller('students')
@UseGuards(RoleGuard)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @SetMetadata('roles', ['admin', 'teacher'])
  @Post()
  @UsePipes(new StudentPipe())
  create(@Body() studentDto: StudentDto) {
    return this.studentService.create(studentDto);
  }

  @SetMetadata('roles', ['admin', 'teacher', 'principal'])
  @Get()
  findAll() {
    return this.studentService.findAll();
  }
  @SetMetadata('roles', ['admin', 'teacher', 'principal'])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(Number(id));
  }

  @SetMetadata('roles', ['admin', 'teacher'])
  @Put(':id')
  updateStudent(@Param('id') id: string, @Body() studentDto: StudentDto) {
    return this.studentService.update(Number(id), studentDto);
  }

  @SetMetadata('roles', ['admin', 'teacher'])
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.studentService.delete(Number(id));
  }
}
