import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Asistente } from './entities/asistente.entity';
import { AsistenteDto } from './dto/asistente.dto';
import { Evento } from 'src/evento/entities/evento.entity';

@Injectable()
export class AsistenteService {
  constructor(
    @InjectRepository(Asistente)
    private readonly asistenteRepository: MongoRepository<Asistente>,

    @InjectRepository(Evento)
    private readonly eventoRepository: MongoRepository<Evento>,
  ) {}
  createAsistente(createAsistenteDto: AsistenteDto) {
    const nuevoAsistente = this.asistenteRepository.create(createAsistenteDto);
    return this.asistenteRepository.save(nuevoAsistente);
  }

  async registrarAsistente(eventoId: number, asistente: AsistenteDto) {
    const evento = await this.eventoRepository.findOne({
      where: { id: eventoId },
    });
    if (!evento) {
      throw new Error(`Evento con ID ${eventoId} no encontrado`);
    }
    const asistentesExistentes = this.asistenteRepository.find({
      where: { evento: { id: eventoId }, email: asistente.email },
    });
    if ((await asistentesExistentes).length > 0) {
      throw new Error(
        `Ya existe un asistente con el email ${asistente.email} en este evento`,
      );
    }

    const asistentesDelEvento = await this.asistenteRepository.find({
      where: { evento: { id: eventoId } },
    });
    if (asistentesDelEvento.length >= evento.auditorio.capacidad) {
      throw new Error(
        'No se puede registrar más asistentes, se ha alcanzado la capacidad del auditorio',
      );
    }

    const nuevoAsistente = this.asistenteRepository.create(asistente);
    nuevoAsistente.evento = evento;
    return this.asistenteRepository.save(nuevoAsistente);
  }

  findAsistentesByEvento(eventoId: number) {
    return this.asistenteRepository.find({
      where: { evento: { id: eventoId } },
    });
  }
}
