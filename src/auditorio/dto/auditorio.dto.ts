import { IsString, IsNumber, Min } from 'class-validator';

export class AuditorioDto {
  @IsString()
  nombre: string;

  @IsNumber()
  @Min(1)
  capacidad: number;

  @IsString()
  ubicacion: string;
}
