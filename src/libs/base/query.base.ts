import type { OrderBy, PaginatedQueryParams } from '../ports/repository.port';

/**
 * Base class for regular queries
 */
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export abstract class QueryBase {}

/**
 * Base class for paginated queries
 */
export abstract class PaginatedQueryBase extends QueryBase {
  limit: number;
  orderBy: OrderBy;
  page: number;

  constructor(props: PaginatedParams<PaginatedQueryBase>) {
    super();
    this.limit = props.limit;
    this.page = props.page;
    this.orderBy = props.orderBy || { field: true, param: 'desc' };
  }
}

// Paginated query parameters
export type PaginatedParams<T> = Omit<T, 'limit' | 'orderBy' | 'page'> &
  PaginatedQueryParams;
