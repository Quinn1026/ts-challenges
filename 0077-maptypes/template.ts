type MapTypes<
  T extends Record<PropertyKey, any>,
  R extends Record<'mapFrom' | 'mapTo', any>
> = {
  [K in keyof T]: T[K] extends R['mapFrom']
    ? R extends { mapFrom: T[K] }
      ? R['mapTo']
      : never
    : T[K]
}
