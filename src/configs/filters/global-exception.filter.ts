import { ArgumentsHost, Catch, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { ResError } from 'src/common/models/res-error.model';

@Catch(BaseExceptionFilter)
export class GlobalExceptionFilter extends BaseExceptionFilter {

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse()
    const status = exception.getStatus();

    const errorRes: ResError = {
      success: false,
      code: 'ERROR',
      statusCode: status || HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception.message,
      error: exception.name || 'Error',
      data: exception.data || undefined,
    }

    if (exception instanceof HttpException)
      errorRes.message = typeof response === 'string' ? response : (response as any)?.message || 'HTTP Error';
    else if (exception instanceof Error) {
      errorRes.message = exception.message || 'Internal Server Error';
    }
    switch (status) {
      case HttpStatus.BAD_REQUEST:
        errorRes.code = 'BAD_REQUEST_ERROR'
        break;
      case HttpStatus.BAD_GATEWAY:
        errorRes.code = 'BAD_GATEWAY_ERROR'
        break;
      case HttpStatus.UNAUTHORIZED:
        errorRes.code = 'UNAUTHORIZED_ERROR'
        break;
      case HttpStatus.INTERNAL_SERVER_ERROR:
        errorRes.code = 'INTERNAL_SERVER_ERROR_ERROR'
        break;
      case HttpStatus.NOT_FOUND:
        errorRes.code = 'NOT_FOUND_ERROR'
        break;

      default:
        break;
    }

    Logger.error(
      `Message: ${errorRes.message}`,
      exception.stack,
      exception.name,
    );
    response
      .status(status)
      .json(errorRes);

  }

}
