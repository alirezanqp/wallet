import { Global, Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PUBLISHER } from '@src/libs/ports/publisher.port';

import { NestjsEventPublisher } from './nest-event-emitter.publisher';

@Global()
@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [
    {
      provide: PUBLISHER,
      useClass: NestjsEventPublisher,
    },
  ],
  exports: [
    {
      provide: PUBLISHER,
      useClass: NestjsEventPublisher,
    },
  ],
})
export class NestjsEventEmitterModule {}
