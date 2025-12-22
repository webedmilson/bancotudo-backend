import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';

@Injectable()
export class ContaService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateContaDto) {
    return this.prisma.conta.create({
      data: {
        numero: data.numero,
        tipo: data.tipo,
        saldo: data.saldo || 0,
        clienteId: data.clienteId,
      },
    });
  }

  findAll() {
    return this.prisma.conta.findMany({
      include: { cliente: true },
    });
  }

  async findOne(id: string) {
    const conta = await this.prisma.conta.findUnique({
      where: { id },
      include: { cliente: true, transacoes: true },
    });
    if (!conta) {
      throw new NotFoundException(`Conta #${id} not found`);
    }
    return conta;
  }

  update(id: string, data: UpdateContaDto) {
    return this.prisma.conta.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    console.log(`Attempting to delete conta with id: ${id}`);
    const result = await this.prisma.conta.delete({
      where: { id },
    });
    console.log(`Deleted conta:`, result);
    return result;
  }
}
