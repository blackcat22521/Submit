import { DynamicModule, Module, OnModuleInit } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { ManagementModule } from 'src/management/management.module';

@Module({})
export class StudentModule implements OnModuleInit {
  onModuleInit() {
    console.log('Student Module initialized.');
  }

  static forRoot(): DynamicModule {
    return {
      module: StudentModule,
      providers: [StudentService],
      controllers: [StudentController],
      exports: [StudentService],
      imports: [ManagementModule.forRoot()],
    };
  }
}
