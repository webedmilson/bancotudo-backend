import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { CreateTransacaoDto } from './dto/create-transacao.dto';
import { CreateTransferenciaDto } from './dto/create-transferencia.dto';
import { UpdateTransacaoDto } from './dto/update-transacao.dto';

@Controller('transacao')
export class TransacaoController {
  constructor(private readonly transacaoService: TransacaoService) {}

  @Post()
  create(@Body() createTransacaoDto: CreateTransacaoDto) {
    return this.transacaoService.create(createTransacaoDto);
  }

  @Post('transferencia')
  transferir(@Body() createTransferenciaDto: CreateTransferenciaDto) {
    return this.transacaoService.transferir(createTransferenciaDto);
  }

  @Get()
  findAll() {
    return this.transacaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transacaoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransacaoDto: UpdateTransacaoDto) {
    return this.transacaoService.update(id, updateTransacaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transacaoService.remove(id);
  }
}
