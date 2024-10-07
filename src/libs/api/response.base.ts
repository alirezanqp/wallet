import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiProperty,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';

export abstract class BaseResponseDto<T> {
  @ApiProperty({ example: true })
  success = true as const; // Default to true as per the requirement

  @ApiProperty()
  data: T;

  constructor(data: T) {
    this.data = data;
  }
}

export function ApiSuccessResponse<T>(
  {
    dto,
    isArray,
    statusCode,
  }: { dto?: Type<T>; isArray?: boolean; statusCode?: HttpStatus } = {
    isArray: false,
  },
) {
  if (dto) {
    return applyDecorators(
      ApiExtraModels(BaseResponseDto, dto),
      ApiResponse({
        status: statusCode ?? HttpStatus.OK,
        schema: {
          allOf: [
            { $ref: getSchemaPath(BaseResponseDto) },
            {
              properties: {
                data: isArray
                  ? {
                      type: 'array',
                      items: { $ref: getSchemaPath(dto) },
                    }
                  : { $ref: getSchemaPath(dto) },
              },
            },
          ],
        },
      }),
    );
  } else {
    return applyDecorators(
      ApiResponse({
        status: statusCode ?? HttpStatus.OK,
        schema: {
          properties: {
            success: {
              type: 'boolean',
              example: true, // The default value for success
            },
          },
        },
      }),
    );
  }
}
