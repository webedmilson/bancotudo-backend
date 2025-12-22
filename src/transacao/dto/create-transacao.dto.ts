import { IsString, IsNotEmpty, IsEnum, IsNumber, IsPositive, IsOptional } from 'class-validator';

export enum TipoTransacao {
  CREDITO = 'CREDITO',
  DEBITO = 'DEBITO',
}

export class CreateTransacaoDto {
  @IsString()
  @IsNotEmpty()
  contaId: string;

  @IsEnum(TipoTransacao)
  @IsNotEmpty()
  tipo: TipoTransacao;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  valor: number;

  @IsString()
  @IsOptional()
  descricao?: string;
}
