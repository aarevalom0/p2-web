import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class AsistenteDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  codigoEstudiante: string;

  @IsEmail()
  email: string;
}
