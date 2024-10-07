import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Logger } from '@nestjs/common';
import type { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { RequestContextService } from '../context/app-request.context';
import Err from '../exception-filters/errors/errors';

export class ExceptionInterceptor implements NestInterceptor {
  private readonly logger: Logger = new Logger(ExceptionInterceptor.name);

  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(err => {
        // Logging for debugging purposes
        if (err.status >= 400 && err.status < 500) {
          this.logger.debug(
            `[${RequestContextService.getRequestId()}] ${err.message}`,
          );

          const isClassValidatorError =
            Array.isArray(err?.response?.message) &&
            typeof err?.response?.error === 'string' &&
            err.status === 400;

          // Transforming class-validator errors to a different format
          if (isClassValidatorError) {
            err = new Err.ValidationError().setSubErrors(
              err?.response?.message,
            );
          }
        }

        if (!err.correlationId) {
          // Adding request ID to error message
          err.correlationId = RequestContextService.getRequestId();
        }

        if (!err.success) {
          err.success = false;
        }

        if (err.response) {
          err.response.correlationId = err.correlationId;
        }

        return throwError(err);
      }),
    );
  }
}
