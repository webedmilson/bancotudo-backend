import { IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID } from 'class-validator';

export class CreateTransferenciaDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  contaOrigemId: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  contaDestinoId: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  valor: number;
}
