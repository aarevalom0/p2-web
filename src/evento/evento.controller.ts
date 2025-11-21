import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { EventoService } from './evento.service';
import { Evento } from './entities/evento.entity';

@Controller('evento')
export class EventoController {
  constructor(private readonly eventoService: EventoService) {}

  @Post()
  crearEvento(@Body() createEventoDto: Evento) {
    return this.eventoService.crearEvento(createEventoDto);
  }

  @Post(':id/aprobar')
  aprobarEvento(@Param('id') id: number) {
    return this.eventoService.aprobarEvento(id);
  }

  @Delete(':id')
  eliminarEvento(@Param('id') id: number) {
    return this.eventoService.eliminarEvento(id);
  }

  @Get(':id')
  findEventoById(@Param('id') id: number) {
    return this.eventoService.findEventoById(id);
  }
}
