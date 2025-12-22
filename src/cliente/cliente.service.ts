import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

/**
 * @Injectable()
 * Este decorator marca a classe como um "Provider".
 * Providers podem ser injetados em outras classes (como Controllers) via injeção de dependência.
 * É aqui que colocamos a Lógica de Negócio (Business Logic).
 */
@Injectable()
export class ClienteService {
  /**
   * Construtor
   * O NestJS automaticamente injeta uma instância de PrismaService aqui.
   * "private" cria automaticamente uma propriedade "this.prisma" na classe.
   */
  constructor(private prisma: PrismaService) {}

  /**
   * Cria um novo cliente no banco de dados.
   * Recebe um DTO (Data Transfer Object) com os dados validados.
   */
  create(data: CreateClienteDto) {
    // this.prisma.cliente acessa a tabela "Cliente" definida no schema.prisma
    return this.prisma.cliente.create({ data });
  }

  /**
   * Lista todos os clientes.
   * O "include: { contas: true }" faz um JOIN automático para trazer as contas de cada cliente.
   */
  findAll() {
    return this.prisma.cliente.findMany({
      include: { contas: true },
    });
  }

  /**
   * Busca um único cliente pelo ID (UUID).
   * O método é "async" porque faz uma chamada ao banco de dados que retorna uma Promise.
   */
  async findOne(id: string) {
    const cliente = await this.prisma.cliente.findUnique({
      where: { id },
      include: { contas: true },
    });

    // Se não encontrar (null), lançamos uma exceção HTTP 404.
    // O NestJS captura isso e retorna uma resposta JSON de erro apropriada.
    if (!cliente) throw new NotFoundException('Cliente não encontrado');
    
    return cliente;
  }

  /**
   * Atualiza os dados de um cliente.
   * Reutilizamos o "findOne" para garantir que o cliente existe antes de tentar atualizar.
   */
  async update(id: string, data: UpdateClienteDto) {
    await this.findOne(id); // Garante que existe (lança 404 se não existir)

    return this.prisma.cliente.update({
      where: { id },
      data, // Passamos apenas os campos que foram enviados para atualização
    });
  }

  /**
   * Remove um cliente do banco de dados.
   */
  async remove(id: string) {
    await this.findOne(id); // Verifica existência

    return this.prisma.cliente.delete({
      where: { id },
    });
  }
}
