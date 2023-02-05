type GetGetters<T extends Record<string, Function>> = {
  [K in keyof T]: T[K] extends () => infer R ? R : never
}

type GetActions<T extends Record<string, Function>> = {
  [K in keyof T]: T[K] extends (...args: infer Args) => infer R ? (...args: Args) => R : never
}

type Store<
  I extends string,
  S extends Record<string, any>,
  G extends Record<string, Function>,
  A extends Record<string, Function>,
> = {
  id: I,
  state(): S,
  getters: G & ThisType<Readonly<S> & GetGetters<G>>,
  actions: A & ThisType<S & Readonly<GetGetters<G>> & A>,
}

declare function defineStore<
  I extends string,
  S extends Record<string, any>,
  G extends Record<string, Function>,
  A extends Record<string, Function>,
>(store: Store<I, S, G, A>): S & GetGetters<G> & GetActions<A>
