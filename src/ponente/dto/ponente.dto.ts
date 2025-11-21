import { IsString, IsNumber, Min } from 'class-validator';

export class PonenteDto {
  @IsNumber()
  @Min(1)
  cedula: number;

  @IsString()
  nombre: string;

  @IsString()
  email: string;

  @IsString()
  tipoPonente: 'Interno' | 'Externo' | 'Invitado';

  @IsString()
  especialidad: string;
}
