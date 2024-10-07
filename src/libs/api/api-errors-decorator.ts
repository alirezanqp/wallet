import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import type { Exception } from '../application/exception-filters/errors/exception';

type ExceptionClass = new (...args: any[]) => Exception;

export function ApiErrors(...errors: ExceptionClass[]) {
  const errs: {
    status: number;
    schema: {
      oneOf: any[];
    };
  }[] = errors.reduce(
    (
      acc: {
        status: number;
        schema: {
          oneOf: any[];
        };
      }[],
      E,
    ) => {
      const err = new E();
      const schema = {
        success: false,
        httpCode: err.httpStatus,
        key: err.key,
        message: err.message,
        correlationId: 'vsxIx',
        properties: {
          success: {
            type: 'boolean',
            example: false,
          },
          httpCode: {
            type: 'number',
            example: err.httpStatus,
          },
          key: {
            type: 'string',
            example: err.key,
          },
          message: {
            type: 'string',
            example: err.message,
          },

          correlationId: {
            type: 'string',
            example: 'vI_sxx',
          },
        },
      };
      const hasBeenAdded = acc.find(a => a.status === (err.httpStatus ?? 500));

      /* // if suberrors exist add in schema
      if (err.subErrors) {
        schema.properties['subErrors'] = {
          type: 'Array',
          example: [],
        };
      } */

      if (hasBeenAdded) {
        hasBeenAdded.schema.oneOf.push(schema);
      } else {
        acc.push({
          status: err.httpStatus ?? 500,
          schema: {
            oneOf: [schema],
          },
        });
      }

      return acc;
    },
    [],
  );
  const errorResponses = errs.map(err => {
    return ApiResponse(err);
  });

  return applyDecorators(...errorResponses);
}
