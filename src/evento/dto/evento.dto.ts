import { IsNotEmpty, IsString, IsDate, IsInt, IsIn } from 'class-validator';

export class EventoDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsDate()
  @IsNotEmpty()
  fecha: Date;

  @IsInt()
  @IsNotEmpty()
  duracionHoras: number;

  @IsString()
  @IsIn(['Propuesto', 'Aprobado', 'Rechazado'])
  @IsNotEmpty()
  estado: string;
}
