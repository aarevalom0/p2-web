import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { AuditorioDto } from './dto/auditorio.dto';

@Injectable()
export class AuditorioService {
  constructor(
    @InjectRepository(AuditorioDto)
    private readonly auditorioRepository: MongoRepository<AuditorioDto>,
  ) {}
  crearAuditorio(createAuditorioDto: AuditorioDto) {
    const { capacidad } = createAuditorioDto;
    if (capacidad <= 0) {
      throw new Error('La capacidad debe ser mayor a cero.');
    }
    const nuevoAuditorio = this.auditorioRepository.create(createAuditorioDto);
    return this.auditorioRepository.save(nuevoAuditorio);
  }
}
