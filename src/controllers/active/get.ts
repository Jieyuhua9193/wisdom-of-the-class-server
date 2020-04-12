import classUtil from "../../utils/classUtil";
import activeModel from '../../models/active';
import resUtil from "../../utils/resUtil";
import Params from './Params';

export default async (req, res, next) => {
  const request = req.body;
  const { email } = req.userInfo;
  try {
    let result: any = {};
    const classId = await classUtil.getClassId(email);
    const status = (request && request.status) || null;
    const pms = new Params(classId, status);
    const findPms = pms.get();
    result.total = await activeModel
      .find(findPms)
      .countDocuments();
    result.list = await activeModel
      .find(findPms)
      .skip((request.page - 1) * request.size)
      .limit(request.size)
      .sort({ 'gmtCreate': 1 })
      .exec();
    res.status(200).send(resUtil(0, result))
  } catch (e) {
    next(e)
  }
}
