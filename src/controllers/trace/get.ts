import trajectoryModel from "../../models/trajectory";
import userModel from "../../models/user";
import createTrace from '../common/createTrace';
import resUtil from "../../utils/resUtil";
import moment = require("moment");


export default async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    const data = await trajectoryModel.find(
      { user: user },
      '-_id -user'
    );
    if (data && data.length) {
      res.status(200).send(resUtil(0, data))
    } else {
      let params = {};
      params['gmtCreate'] = user.gmtCreate;
      params['text'] = `加入班级`;
      await createTrace(user, params);
      let newData = [
        {
          gmtCreate: user.gmtCreate,
          email: user.email,
          traceText: params['text']
        }
      ];
      res.status(200).send(resUtil(0, newData));
    }
  } catch (e) {
    next(e)
  }
}
