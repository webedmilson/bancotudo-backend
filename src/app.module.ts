import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ClienteModule } from './cliente/cliente.module'
import { ContaModule } from './conta/conta.module'
import { TransacaoModule } from './transacao/transacao.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [ClienteModule, ContaModule, TransacaoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
