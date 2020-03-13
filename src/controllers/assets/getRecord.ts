import { assetsRecordModel } from '../../models/assets';
import resUtil from '../../utils/resUtil';
import classUtil from '../../utils/classUtil';

export default async (req, res, next) => { // 获取班级资产记录
  const { email } = req.userInfo;
  const { page, size } = req.body;
  try {
    const classId = await classUtil.getClassId(email);
    const total = await assetsRecordModel
      .find({ class: classId })
      .countDocuments()
    const record = await assetsRecordModel
      .find({ class: classId })
      .skip((page - 1) * size)
      .limit(size)
      .sort({ '_id': -1 })
      .exec();
    const result = { total, record }
    res.status(200).send(resUtil(0, result))
  } catch (err) {
    next(err)
  }
}