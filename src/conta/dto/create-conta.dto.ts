import { IsString, IsNotEmpty, IsEnum, IsOptional, IsNumber, IsUUID } from 'class-validator';
import { TipoConta } from '@prisma/client';

export class CreateContaDto {
  @IsString()
  @IsNotEmpty()
  numero: string;

  @IsEnum(TipoConta)
  tipo: TipoConta;

  @IsOptional()
  @IsNumber()
  saldo?: number;

  @IsUUID()
  @IsNotEmpty()
  clienteId: string;
}
