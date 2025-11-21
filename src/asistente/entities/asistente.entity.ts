import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Evento } from 'src/evento/entities/evento.entity';

@Entity('asistentes')
export class Asistente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  codigoEstudiante: string;

  @Column()
  email: string;

  @ManyToOne(() => Evento, (evento) => evento.asistentes)
  evento: Evento;
}
