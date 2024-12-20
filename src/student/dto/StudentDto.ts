import { IsNotEmpty, IsString } from 'class-validator';

export class StudentDto {
  @IsNotEmpty({ message: 'studentName is required.' })
  @IsString({ message: 'studentName must be a string.' })
  studentName: string;

  @IsNotEmpty({ message: 'className is required.' })
  @IsString({ message: 'className must be a string.' })
  className: string;
}
