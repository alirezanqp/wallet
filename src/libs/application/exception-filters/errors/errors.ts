import { Exception } from './exception';

class BadRequestError extends Exception {
  constructor(message?: string) {
    super({
      key: 'BAD_REQUEST',
      message: message ?? 'One or more constraints were not satisfied',
      httpStatus: 400,
    });
  }
}

class ValidationError extends Exception {
  constructor(message?: string) {
    super({
      key: 'VALIDATION_ERROR',
      message: message ?? 'One or more fields constraints were not satisfied',
      httpStatus: 400,
    });
  }

  setSubErrors(subErrors?: string[]) {
    this.subErrors = subErrors ?? this.subErrors;
    return this;
  }
}

class Unauthorized extends Exception {
  constructor(message?: string) {
    super({
      key: 'UNAUTHORIZED',
      message: message ?? 'You must be authorized to perform this action',
      httpStatus: 401,
    });
  }
}

class Forbidden extends Exception {
  constructor(message?: string) {
    super({
      key: 'FORBIDDEN',
      message:
        message ??
        "You don't have the necessary permission to perform this action",
      httpStatus: 403,
    });
  }
}

class InternalServerError extends Exception {
  constructor(message?: string) {
    super({
      key: 'INTERNAL_SERVER_ERROR',
      message:
        message ?? 'Something unexpected happened, please try again later',
      httpStatus: 500,
    });
  }
}

class ArgumentInvalidError extends Exception {
  constructor(message?: string) {
    super({
      key: 'ARGUMENT_INVALID',
      message: message ?? 'One or more fields constraints were not satisfied',
      httpStatus: 400,
    });
  }
}

class NotFoundException extends Exception {
  constructor(message?: string) {
    super({
      key: 'NOT_FOUND',
      message: message ?? 'Resource not found',
      httpStatus: 404,
    });
  }
}

const Err = {
  ArgumentInvalidError,
  InternalServerError,
  Forbidden,
  Unauthorized,
  ValidationError,
  BadRequestError,
  NotFoundException,
};

export default Err;
