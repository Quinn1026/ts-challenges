type IsRequiredKey<
  T,
  K extends keyof T,
> = { [P in K]: T[P] } extends { [P in K]-?: T[P] }
  ? true
  : false

