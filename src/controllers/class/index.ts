import create from './create';
import get from './get';
import join from './join';
import remove from './remove';

class MyClass {
  constructor() {
  }
  public create = create;
  public get = get;
  public join = join;
  public remove = remove;
}

export default new MyClass()
