import get from './get';
import getStudentsById from './getStudentsById';

class Dormitory {
  constructor() {
  }
  public get = get;
  public getStudentsById = getStudentsById;
}

export default new Dormitory()
