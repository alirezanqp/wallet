export const snapshot = <T>(o: T): Readonly<T> => {
  return Object.freeze(Object.assign({}, o));
};
