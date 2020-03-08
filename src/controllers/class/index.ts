import create from './create';
import get from './get';
import join from './join';

class MyClass {
  constructor() {
  }
  public create = create;
  public get = get;
  public join = join;
}

export default new MyClass()
