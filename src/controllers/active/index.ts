import create from './create';
import get from './get';

class MyClass {
  constructor() {
  }
  public create = create;
  public get = get;
}

export default new MyClass()
