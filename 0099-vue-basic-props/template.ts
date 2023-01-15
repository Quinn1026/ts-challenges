type GetComputedType<T extends Record<string, Function>> = {
  [P in keyof T]: T[P] extends (...args: unknown[]) => infer A ? A : never
}

type TransitionPropConstructor<T> = T extends { (...args: unknown[]): infer R }
  ? R
  : T extends new (...args: unknown[]) => infer V
    ? V
    : T

class ClassA {}
type WW = {
  propB: {
    type: StringConstructor;
  };
  propC: {
    type: BooleanConstructor;
  };
  propD: {
    type: typeof ClassA;
  };
  propE: {
    type: (StringConstructor | NumberConstructor)[];
  };
  propF: RegExpConstructor
}
type W1 = StringConstructor extends { (...args: unknown[]): infer R } ? R : never // string
type W2 = typeof ClassA extends new (...args: unknown[]) => infer R ? R : never // ClassA

type GetPropsType<T extends Record<string, unknown>> = {
  [P in keyof T]: T[P] extends { type: infer TYPE }
    ? TYPE extends (infer A)[]
      ? TransitionPropConstructor<A>
      : TransitionPropConstructor<TYPE>
    : T[P] extends Record<string, never>
      ? any
      : TransitionPropConstructor<T[P]>
}

type PropsOptions<
  P extends Record<string, unknown>,
  D extends Record<string, unknown>,
  C extends Record<string, Function>,
  M extends Record<string, Function>
> = {
  props?: P,
  data?(this: GetPropsType<P>): D ,
  computed?: C & ThisType<GetPropsType<P> & D & GetComputedType<C>>,
  methods?: M & ThisType<GetPropsType<P> & D & GetComputedType<C> & M>
}
declare function VueBasicProps<
  P extends Record<string, unknown>,
  D extends Record<string, unknown>,
  C extends Record<string, Function>,
  M extends Record<string, Function>
>(options: PropsOptions<P, D, C, M>): any
