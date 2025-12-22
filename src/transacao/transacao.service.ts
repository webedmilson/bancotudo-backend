import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransacaoDto, TipoTransacao } from './dto/create-transacao.dto';
import { CreateTransferenciaDto } from './dto/create-transferencia.dto';
import { UpdateTransacaoDto } from './dto/update-transacao.dto';

@Injectable()
export class TransacaoService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTransacaoDto) {
    const { contaId, tipo, valor, descricao } = data;

    // Verificar se a conta existe
    const conta = await this.prisma.conta.findUnique({
      where: { id: contaId },
    });

    if (!conta) {
      throw new NotFoundException('Conta não encontrada');
    }

    // Converter valor para número (caso venha string) e garantir que seja positivo
    const valorTransacao = Number(valor);
    if (valorTransacao <= 0) {
      throw new BadRequestException('O valor da transação deve ser positivo');
    }

    // Se for débito, verificar saldo
    if (tipo === TipoTransacao.DEBITO && Number(conta.saldo) < valorTransacao) {
      throw new BadRequestException('Saldo insuficiente para realizar a transação');
    }

    // Realizar a transação de forma atômica (criar registro + atualizar saldo)
    return this.prisma.$transaction(async (prisma) => {
      // 1. Criar o registro da transação
      const transacao = await prisma.transacao.create({
        data: {
          contaId,
          tipo,
          valor: valorTransacao,
          descricao,
        },
      });

      // 2. Atualizar o saldo da conta
      const novoSaldo =
        tipo === TipoTransacao.CREDITO
          ? Number(conta.saldo) + valorTransacao
          : Number(conta.saldo) - valorTransacao;

      await prisma.conta.update({
        where: { id: contaId },
        data: { saldo: novoSaldo },
      });

      return transacao;
    });
  }

  async transferir(data: CreateTransferenciaDto) {
    const { contaOrigemId, contaDestinoId, valor } = data;

    // Validações básicas
    if (contaOrigemId === contaDestinoId) {
      throw new BadRequestException('A conta de origem e destino não podem ser as mesmas');
    }

    const valorTransferencia = Number(valor);
    if (valorTransferencia <= 0) {
      throw new BadRequestException('O valor da transferência deve ser positivo');
    }

    // Buscar contas
    const contaOrigem = await this.prisma.conta.findUnique({ where: { id: contaOrigemId } });
    const contaDestino = await this.prisma.conta.findUnique({ where: { id: contaDestinoId } });

    if (!contaOrigem) throw new NotFoundException('Conta de origem não encontrada');
    if (!contaDestino) throw new NotFoundException('Conta de destino não encontrada');

    // Verificar saldo
    if (Number(contaOrigem.saldo) < valorTransferencia) {
      throw new BadRequestException('Saldo insuficiente na conta de origem');
    }

    // Executar transferência atômica
    return this.prisma.$transaction(async (prisma) => {
      // 1. Debitar da Origem
      const debito = await prisma.transacao.create({
        data: {
          contaId: contaOrigemId,
          tipo: TipoTransacao.DEBITO,
          valor: valorTransferencia,
          descricao: `Transferência enviada para conta ${contaDestino.numero}`,
        },
      });

      await prisma.conta.update({
        where: { id: contaOrigemId },
        data: { saldo: { decrement: valorTransferencia } },
      });

      // 2. Creditar no Destino
      const credito = await prisma.transacao.create({
        data: {
          contaId: contaDestinoId,
          tipo: TipoTransacao.CREDITO,
          valor: valorTransferencia,
          descricao: `Transferência recebida da conta ${contaOrigem.numero}`,
        },
      });

      await prisma.conta.update({
        where: { id: contaDestinoId },
        data: { saldo: { increment: valorTransferencia } },
      });

      return { debito, credito };
    });
  }

  findAll() {
    return this.prisma.transacao.findMany({
      include: {
        conta: {
          include: {
            cliente: true,
          },
        },
      },
      orderBy: { criadaEm: 'desc' },
    });
  }

  async findOne(id: string) {
    const transacao = await this.prisma.transacao.findUnique({
      where: { id },
      include: { conta: true },
    });

    if (!transacao) {
      throw new NotFoundException('Transação não encontrada');
    }

    return transacao;
  }

  // Atualização de transação não é comum em sistemas financeiros (geralmente estorna-se), 
  // mas mantendo o esqueleto se for apenas para correção de descrição.
  update(id: string, updateTransacaoDto: UpdateTransacaoDto) {
    return this.prisma.transacao.update({
      where: { id },
      data: updateTransacaoDto,
    });
  }

  remove(id: string) {
    return this.prisma.transacao.delete({
      where: { id },
    });
  }
}
