import messageTarget from '../../../status/messageTarget';
import userModel from '../../../models/user';

class Target {
  private readonly target: number;
  private readonly classId: object;
  private readonly users: object[];

  constructor(target: number, classId: object, users?: object[]) {
    this.target = target;
    this.classId = classId;
    this.users = users;
  }

  public async get(): Promise<object[]> {
    let params: object;
    switch (this.target) {
      case messageTarget.custom:
        return this.users;
      case  messageTarget.allUser:
        params = {
          class: this.classId
        };
        break;
      case  messageTarget.allStudents:
        params = {
          $and: [
            { class: this.classId },
            { role: { $gt: 2 } }
          ]
        };
        break;
      case messageTarget.allTeachers:
        params = {
          $and: [
            { class: this.classId },
            { role: { $lte: 2 } }
          ]
        };
        break;
      default:
        break
    }
    return await userModel.find(params, '-_id -__v');
  }
}

export default Target
