import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDto } from './create-cliente.dto';

// UpdateClienteDto herda os campos do CreateClienteDto, todos opcionais
export class UpdateClienteDto extends PartialType(CreateClienteDto) {}
