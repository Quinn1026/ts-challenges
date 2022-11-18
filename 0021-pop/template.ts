type Pop<T extends any[]> = T extends [...infer A, unknown] ? A : T
