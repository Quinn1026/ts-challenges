class ClassAA {
  public str: string
  protected num: number
  private bool: boolean
  constructor() {
    this.str = 'naive'
    this.num = 19260917
    this.bool = true
  }

  getNum() {
    return Math.random()
  }
}

type AA1 = {
  [P in keyof ClassAA]: ClassAA[P]
} // { str: string; getNum: () => number }

type AA2 = keyof ClassAA // str | getNum

type ClassPublicKeys<T> = keyof T
