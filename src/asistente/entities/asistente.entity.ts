import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("asistentes")
export class Asistente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  codigoEstudiante: string;

  @Column()
  email: string;
}