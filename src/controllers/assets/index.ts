import change from './change';
import get from './get';
import getRecord from './getRecord';

class Assets {
  constructor() {
  }
  public change = change;
  public get = get;
  public getRecord = getRecord;
}

export default new Assets()
