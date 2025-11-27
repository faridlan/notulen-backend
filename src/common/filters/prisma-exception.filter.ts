/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from 'generated/prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError, Prisma.PrismaClientValidationError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    let status = HttpStatus.BAD_REQUEST;
    let message = 'Database error';

    // Foreign key violation
    if (exception.code === 'P2003') {
      message = 'Related record does not exist';
      status = 400;
    }

    // Unique constraint failed
    if (exception.code === 'P2002') {
      message = `Duplicate value: ${exception.meta.target}`;
      status = 409;
    }

    // Record not found
    if (exception.code === 'P2025') {
      message = 'Record not found';
      status = 404;
    }

    console.error('🔥 PRISMA ERROR:', exception);

    return res.status(status).json({
      statusCode: status,
      message,
      path: req.url,
      timestamp: new Date().toISOString(),
    });
  }
}
