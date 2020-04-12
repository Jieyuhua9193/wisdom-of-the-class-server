import {Status} from '../../status/active';

interface FindParams {
  $and: any[]
}

class Params {
  private readonly status: number;
  private readonly classId: string;
  private readonly now: number;

  constructor(classId: string, status?: number) {
    this.classId = classId;
    this.status = status;
    this.now = new Date().getTime();
  }

  public get() {
    if (!this.status) {
      return {
        class: this.classId
      }
    } else {
      let params: FindParams = {
        $and: [
          { class: this.classId }
        ]
      };
      switch (this.status) {
        case Status.Prepare:
          params.$and.push({
            bookingAt: { $gt: this.now }
          });
          break;
        case Status.Ing:
          params.$and.push({
            bookingAt: { $lte: this.now }
          });
          params.$and.push({
            endAt: { $gte: this.now }
          });
          break;
        case Status.End:
          params.$and.push({
            endAt: { $lt: this.now }
          });
          break;
        default:
          break;
      }
      return params
    }
  }
}

export default Params
