// import { ArgumentNotProvidedException } from '../exceptions';
import { Guard } from '../guard';
// eslint-disable-next-line import/no-cycle
import { convertPropsToObject } from '../utils/convert-props-to-object.util';

// TODO: fix cycle

/**
 * Domain Primitive is an object that contains only a single value
 */
export type Primitives = boolean | number | string;
export interface DomainPrimitive<T extends Date | Primitives> {
  value: T;
}

type ValueObjectProps<T> = T extends Date | Primitives ? DomainPrimitive<T> : T;

export abstract class ValueObject<T> {
  protected readonly props: ValueObjectProps<T>;

  constructor(props: ValueObjectProps<T>) {
    this.checkIfEmpty(props);
    this.validate(props);
    this.props = props;
  }

  protected abstract validate(props: ValueObjectProps<T>): void;

  static isValueObject(obj: unknown): obj is ValueObject<unknown> {
    return obj instanceof ValueObject;
  }

  /**
   *  Check if two Value Objects are equal. Checks structural equality.
   * @param vo ValueObject
   */
  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }

    return JSON.stringify(this) === JSON.stringify(vo);
  }

  /**
   * Unpack a value object to get its raw properties
   */
  public unpack(): T {
    if (this.isDomainPrimitive(this.props)) {
      return this.props.value;
    }

    const propsCopy = convertPropsToObject(this.props);

    return Object.freeze(propsCopy);
  }

  private checkIfEmpty(props: ValueObjectProps<T>): void {
    if (
      Guard.isEmpty(props) ||
      (this.isDomainPrimitive(props) && Guard.isEmpty(props.value))
    ) {
      // throw new ArgumentNotProvidedException('Property cannot be empty');
    }
  }

  private isDomainPrimitive(
    obj: any,
  ): obj is DomainPrimitive<T & (Date | Primitives)> {
    if (Object.hasOwn(obj, 'value')) {
      return true;
    }

    return false;
  }
}
