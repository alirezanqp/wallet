import type { Exception } from '../application/exception-filters/errors/exception';

export abstract class BaseRule {
  public abstract error: Exception;
  public abstract isBroken(): boolean;
}

/**
 * Throws when a broken rule is found
 */
export const checkRules = (rules: BaseRule[]) => {
  rules.forEach(r => {
    if (r.isBroken()) {
      throw r.error;
    }
  });
};
