import { ApiProperty } from '@nestjs/swagger';

export class ApiErrorResponse {
  @ApiProperty({ example: 400 })
  readonly statusCode: number;

  @ApiProperty({ example: 'one or more fields constraints were not satisfied' })
  readonly message: string;

  @ApiProperty({ example: 'VALIDATION_ERROR' })
  readonly key: string;

  @ApiProperty({ example: 'YevPQs' })
  readonly correlationId: string;

  @ApiProperty({
    example: ['incorrect email'],
    description: 'Optional list of sub-errors',
    nullable: true,
    required: false,
  })
  readonly subErrors?: string[];

  constructor(body: ApiErrorResponse) {
    this.statusCode = body.statusCode;
    this.message = body.message;
    this.key = body.key;
    this.correlationId = body.correlationId;
    this.subErrors = body.subErrors;
  }
}
