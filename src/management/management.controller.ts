import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { ManagementService } from './management.service';
import { ClassDto } from './dto/class.dto';
import { RoleGuard } from 'src/guards/guards';

// @UseInterceptors(GlobalInterceptor)
@Controller('classes')
@UseGuards(RoleGuard)
export class ManagementController {
  constructor(private readonly managementService: ManagementService) {}

  // Admin và Principal có quyền tạo lớp
  @Post()
  @SetMetadata('roles', ['admin', 'principal'])
  create(@Body() classDto: ClassDto) {
    return this.managementService.create(classDto);
  }

  // Tất cả roles đều có thể xem danh sách lớp
  @Get()
  @SetMetadata('roles', ['admin', 'principal', 'teacher'])
  findAll() {
    return this.managementService.findAll();
  }

  // Tất cả roles đều có thể xem chi tiết lớp học
  @Get(':id')
  @SetMetadata('roles', ['admin', 'principal', 'teacher'])
  findOne(@Param('id') id: string) {
    return this.managementService.findOne(Number(id));
  }

  // Admin và Principal có quyền cập nhật thông tin lớp
  @Put(':id')
  @SetMetadata('roles', ['admin', 'principal'])
  update(@Param('id') id: string, @Body() classDto: ClassDto) {
    return this.managementService.update(Number(id), classDto);
  }

  // Admin và Principal có quyền xóa lớp
  @Delete(':id')
  @SetMetadata('roles', ['admin', 'principal'])
  delete(@Param('id') id: string) {
    return this.managementService.delete(Number(id));
  }
}
