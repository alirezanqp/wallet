import { Module, Provider } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { RequestContextModule } from 'nestjs-request-context';
import { ContextInterceptor } from './libs/application/context/context.interceptor';
import { NestjsEventEmitterModule } from './libs/application/event-publisher/nest-event-emitter.publisher.module';
import { AllExceptionsFilter } from './libs/application/exception-filters/filters';
import { ExceptionInterceptor } from './libs/application/interceptors/exception.interceptor';
import { WalletModule } from './modules/wallet/wallet.module';

const interceptors: Provider[] = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ContextInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ExceptionInterceptor,
  },
];

const filters: Provider[] = [
  {
    provide: APP_FILTER,
    useClass: AllExceptionsFilter,
  },
];

@Module({
  imports: [
    NestjsEventEmitterModule,
    RequestContextModule,
    CqrsModule,

    // Business Domain Modules
    WalletModule
  ],
  providers: [...interceptors, ...filters],
})
export class AppModule {}
