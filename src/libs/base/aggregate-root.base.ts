import type { Logger } from '@nestjs/common';

import { RequestContextService } from '../application/context/app-request.context';
import type { Publisher } from '../ports/publisher.port';
import { Entity } from './entity.base';
import type { BaseEvent } from './event.base';

export abstract class AggregateRoot<Props> extends Entity<Props> {
  private events: BaseEvent[] = [];

  /**
   * Adds an event to event list
   */
  protected addEvent(event: BaseEvent): void {
    this.events.push(event);
  }

  /**
   * Get a list of all events
   */
  public getEvents(): BaseEvent[] {
    return [...this.events];
  }

  /**
   * Clears the event list
   */
  public clearEvents(): void {
    this.events = [];
  }

  /**
   * Publishes all events
   */
  public async publishEvents(
    logger: Logger,
    publisher: Publisher,
  ): Promise<void> {
    await Promise.all(
      this.events.map(async event => {
        if (event.isPublic) {
          logger.debug(
            `[${RequestContextService.getRequestId()}] "${
              event.constructor.name
            }" event published for aggregate ${this.constructor.name} : ${
              this.id
            }`,
          );
          return publisher.publish(event.constructor.name, event);
        }
      }),
    );
    this.clearEvents();
  }
}
