import { IsString, IsOptional, IsEmail } from 'class-validator';

// DTO (Data Transfer Object) define e valida o formato do corpo da requisição
export class CreateClienteDto {
  // nome é obrigatório e precisa ser uma string
  @IsString()
  nome: string;

  // cpf é obrigatório e precisa ser uma string (único no banco)
  @IsString()
  cpf: string;

  // email é opcional e, se enviado, deve ser um e-mail válido
  @IsOptional()
  @IsEmail()
  email?: string;

  // telefone é opcional
  @IsOptional()
  @IsString()
  telefone?: string;

  @IsOptional()
  @IsString()
  cep?: string;

  @IsOptional()
  @IsString()
  endereco?: string;

  @IsOptional()
  @IsString()
  numero?: string;

  @IsOptional()
  @IsString()
  bairro?: string;
  
}
