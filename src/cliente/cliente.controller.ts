import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

/**
 * @Controller('cliente')
 * Define que esta classe é um Controller e que todas as rotas começarão com "/cliente".
 * Ex: GET /cliente, POST /cliente, GET /cliente/123
 */
@Controller('cliente')
export class ClienteController {
  /**
   * Injeção de Dependência:
   * O NestJS fornece uma instância de ClienteService para que possamos usar suas funções.
   */
  constructor(private readonly clienteService: ClienteService) {}

  /**
   * @Post()
   * Mapeia requisições HTTP POST para este método.
   * Usado para criar recursos.
   * 
   * @Body()
   * Extrai o corpo da requisição (JSON) e converte para o tipo CreateClienteDto.
   * Se houver validações no DTO (class-validator), elas rodam aqui.
   */
  @Post()
  create(@Body() dto: CreateClienteDto) {
    return this.clienteService.create(dto);
  }

  /**
   * @Get()
   * Mapeia requisições HTTP GET.
   * Usado para buscar dados.
   */
  @Get()
  findAll() {
    return this.clienteService.findAll();
  }

  /**
   * @Get(':id')
   * Define uma rota com parâmetro dinâmico ":id".
   * 
   * @Param('id')
   * Captura o valor do parâmetro "id" da URL.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clienteService.findOne(id);
  }

  /**
   * @Patch(':id')
   * HTTP PATCH é usado para atualizações parciais.
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateClienteDto) {
    return this.clienteService.update(id, dto);
  }

  /**
   * @Delete(':id')
   * HTTP DELETE para remover recursos.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clienteService.remove(id);
  }
}
