import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    console.error('Prisma Error:', exception.code, exception.meta);

    // P2002: Unique constraint failed
    if (exception.code === 'P2002') {
      const target = exception.meta?.target;
      // Se target for array, pega o primeiro, senão usa string genérica
      const field = target ? (Array.isArray(target) ? target.join(', ') : target) : 'CPF ou Email';
      
      const message = `Já existe um registro com este valor (${field})`;
      
      response.status(HttpStatus.CONFLICT).json({
        statusCode: HttpStatus.CONFLICT,
        message: message,
        error: 'Conflict',
      });
    } else {
      // Outros erros do Prisma
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Erro interno no banco de dados',
        error: exception.code,
      });
    }
  }
}
