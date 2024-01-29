import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class AllExeptionsFilter implements ExceptionFilter  {

  private readonly logger = new Logger(AllExeptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const contexto =  host.switchToHttp()

    const response = contexto.getResponse() as Response
    const request = contexto.getRequest() as Request

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception instanceof HttpException
      ? exception.getResponse()
      : exception;

    this.logger.error(`Http Status: ${status} Error: Message: ${JSON.stringify(message)}`)

    return response.status(status).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      error: message
    });

  }
}