import change from './change';
import get from './get';
import init from './init';

class Assets {
  constructor() {
  }
  public change = change;
  public get = get;
  public init = init;
}

export default new Assets()
