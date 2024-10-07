import '../libs/utils/dotenv';

import { get } from 'env-var';

export const appConfig = {
  host: get('HOST').default('localhost').asString(),
  port: get('PORT').default(3000).asPortNumber(),
  env: get('NODE_ENV').default('development').asString(),
  isProduction:
    get('NODE_ENV').default('development').asString() === 'production',
  isDevelopment:
    get('NODE_ENV').default('development').asString() === 'development',
  isTest: get('NODE_ENV').default('development').asString() === 'test',
};
