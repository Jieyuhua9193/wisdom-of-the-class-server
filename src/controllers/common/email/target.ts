import messageTarget from '../../../status/messageTarget';
import userModel from '../../../models/user';

interface Target {
  type: number;
  users?: object[];
}

class Target {

  private readonly target: Target;
  private readonly classId: object;

  constructor(target: Target, classId: object) {
    this.target = target;
    this.classId = classId;
  }

  public async get(): Promise<object[]> {
    let params: object;
    switch (this.target.type) {
      case messageTarget.custom:
        return this.target.users;
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
