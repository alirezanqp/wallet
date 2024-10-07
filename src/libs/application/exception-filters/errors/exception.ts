import { RequestContextService } from '../../context/app-request.context';

export class Exception extends Error {
  public key: string;
  public httpStatus?: number;
  public subErrors: string[] = [];
  public correlationId?: string;
  public cause?: unknown;
  constructor(data: {
    key: string;
    message: string;
    httpStatus?: number;
    subErrors?: string[];
    correlationId?: string;
    cause?: unknown;
  }) {
    super(data.message);
    this.key = data.key;
    this.httpStatus = data.httpStatus;
    this.subErrors = data.subErrors ?? [];
    this.correlationId =
      data.correlationId ?? RequestContextService.getRequestId();
    this.cause = data.cause;
  }

  /**
   * Used to add more details for development purposes. Will not be shown to the client
   */
  setCause(cause: unknown) {
    this.cause = cause;
    return this;
  }

  setCorrelationId(id?: string) {
    this.correlationId = id ?? this.correlationId;
    return this;
  }
}
