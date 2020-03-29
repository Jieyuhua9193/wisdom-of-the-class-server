import get from './get'
import search from './search'

class Student {
  constructor() { }

  public get = get
  public search = search
}

export default new Student()