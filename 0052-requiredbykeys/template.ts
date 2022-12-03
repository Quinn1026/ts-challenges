type Clone<T> = Pick<T, keyof T>
type RequiredByKeys<T, K extends PropertyKey = keyof T> =
  Clone<Omit<T, K> & Required<Pick<T, Extract<keyof T, K>>>>
