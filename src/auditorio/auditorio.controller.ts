import { Controller, Post, Body } from '@nestjs/common';
import { AuditorioService } from './auditorio.service';
import { AuditorioDto } from './dto/auditorio.dto';

@Controller('auditorio')
export class AuditorioController {
  constructor(private readonly auditorioService: AuditorioService) {}

  @Post()
  crearAuditorio(@Body() createAuditorioDto: AuditorioDto) {
    return this.auditorioService.crearAuditorio(createAuditorioDto);
  }
}
