import { nanoid } from 'nanoid';

import { RequestContextService } from '../application/context/app-request.context';

export abstract class BaseEvent {
  readonly correlationId?: string;
  readonly userId?: string;
  readonly id = nanoid(4);

  constructor(
    public data: unknown,
    public name: string,
    public isPublic: boolean = false,

    public date: Date = new Date(),
  ) {
    const ctx = RequestContextService.getContext();
    this.correlationId = this.correlationId || ctx?.requestId;
    this.userId = ctx?.user?.id;
  }
}
