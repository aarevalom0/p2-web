import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { EventoDto } from './dto/evento.dto';
import { Evento } from './entities/evento.entity';

@Injectable()
export class EventoService {
  constructor(
    @InjectRepository(Evento)
    private readonly eventoRepository: MongoRepository<Evento>,
  ) {}

  crearEvento(createEventoDto: Evento) {
    const { duracionHoras, ponente, descripcion } = createEventoDto;
    if (duracionHoras <= 0) {
      throw new Error('La duración debe ser positiva.');
    }
    if (ponente.tipoPonente === 'Invitado') {
      if (descripcion.length < 50) {
        throw new Error(
          'La descripción debe tener al menos 50 caracteres para ponentes invitados.',
        );
      }
    }
    const nuevoEvento = this.eventoRepository.create(createEventoDto);
    return this.eventoRepository.save(nuevoEvento);
  }

  async aprobarEvento(id: number) {
    const evento = await this.eventoRepository.findOne({ where: { id: id } });
    if (!evento) {
      throw new NotFoundException(`Evento con ID ${id} no encontrado`);
    }
    if (!evento.auditorio) {
      throw new BadRequestException(
        'Solo puede aprobarse un evento con auditorio asignado',
      );
    }
    evento.estado = 'Aprobado';
    return this.eventoRepository.save(evento);
  }

  async eliminarEvento(id: number) {
    const evento = await this.eventoRepository.findOne({ where: { id: id } });
    if (!evento) {
      throw new NotFoundException(`Evento con ID ${id} no encontrado`);
    }
    if (evento.estado === 'Aprobado') {
      throw new BadRequestException('No se puede eliminar un evento aprobado');
    }
    return this.eventoRepository.delete(id);
  }

  findEventoById(id: number) {
    return this.eventoRepository.findOne({ where: { id: id } });
  }
}
