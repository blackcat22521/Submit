import { DynamicModule, Module, OnModuleInit } from '@nestjs/common';
import { ManagementService } from './management.service';
import { ManagementController } from './management.controller';

@Module({})
export class ManagementModule implements OnModuleInit {
  onModuleInit() {
    console.log('Management Module initialized.');
  }

  static forRoot(): DynamicModule {
    return {
      module: ManagementModule,
      providers: [ManagementService],
      controllers: [ManagementController],
      exports: [ManagementService],
    };
  }
}
