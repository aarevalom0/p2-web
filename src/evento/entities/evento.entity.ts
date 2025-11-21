import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Asistente } from 'src/asistente/entities/asistente.entity';
import { Auditorio } from 'src/auditorio/entities/auditorio.entity';
import { Ponente } from 'src/ponente/entities/ponente.entity';

@Entity('eventos')
export class Evento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column()
  fecha: Date;

  @Column()
  duracionHoras: number;

  @Column()
  estado: string;

  @OneToMany(() => Asistente, (asistente) => asistente.evento)
  asistentes: Asistente[];

  @ManyToOne(() => Auditorio, (auditorio) => auditorio.eventos)
  auditorio: Auditorio;

  @ManyToOne(() => Ponente, (ponente) => ponente.eventos)
  ponente: Ponente;
}
