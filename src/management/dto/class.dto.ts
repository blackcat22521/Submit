import { IsNotEmpty, IsString } from 'class-validator';

export class ClassDto {
  @IsNotEmpty({ message: 'className is required.' })
  @IsString({ message: 'className must be a string.' })
  className: string;
}
