import { IsString, IsEmail, IsDateString } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  phoneNumber!: string;

  @IsDateString()
  dob!: string;
}