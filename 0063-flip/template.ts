type Flip<T extends Record<PropertyKey, any>> = {
  [P in keyof T as T[P] extends PropertyKey ? T[P] : `${T[P]}`]: P
}
