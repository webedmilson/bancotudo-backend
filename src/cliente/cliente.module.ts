import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

/**
 * @Module()
 * O Módulo organiza o código em funcionalidades coesas.
 * Tudo relacionado a "Cliente" fica aqui.
 */
@Module({
  // imports: Módulos que este módulo precisa para funcionar.
  // PrismaModule fornece o PrismaService para acessar o banco.
  imports: [PrismaModule],

  // controllers: Quais controllers este módulo gerencia (rotas).
  controllers: [ClienteController],

  // providers: Serviços, repositórios, factories, helpers, etc.
  // Classes que podem ser injetadas (@Injectable).
  providers: [ClienteService],
})
export class ClienteModule {}
