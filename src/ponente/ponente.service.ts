import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { PonenteDto } from './dto/ponente.dto';

@Injectable()
export class PonenteService {
  constructor(
    @InjectRepository(PonenteDto)
    private readonly ponenteRepository: MongoRepository<PonenteDto>,
  ) {}

  crearPonente(createPonenteDto: PonenteDto) {
    const { tipoPonente, email } = createPonenteDto;
    if (tipoPonente === 'Interno') {
      if (!email.endsWith('.edu')) {
        throw new Error('El email de un ponente interno debe terminar en .edu');
      }
    } else if (tipoPonente === 'Invitado' || tipoPonente === 'Externo') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('El email de un ponente invitado debe ser válido');
      }
    }

    const nuevoPonente = this.ponenteRepository.create(createPonenteDto);
    return this.ponenteRepository.save(nuevoPonente);
  }

  findPonenteById(id: number) {
    return this.ponenteRepository.findOne({ where: { id: id } });
  }

  async eliminarPonente(id: number) {
    const ponente = await this.ponenteRepository.findOne({
      where: { id: id },
      relations: ['eventos'],
    });
    if (!ponente) {
      throw new NotFoundException(`Ponente con ID ${id} no encontrado`);
    }
    return this.ponenteRepository.delete(id);
  }
}
