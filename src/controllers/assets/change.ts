import assetsModel, { assetsRecordModel } from '../../models/assets';
import userModel from '../../models/user';
import resUtil from '../../utils/resUtil';
import classUtil from '../../utils/classUtil';
import assetsChangeType from '../../status/assetsChangeType';

export default async (req, res, next) => {
  const { email } = req.userInfo;
  let record = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user.role >= 2 && user.role !== 7) {
      res.status(200).send(resUtil('ROLE_ERROR', '权限不足'))
    } else {
      const classId = await classUtil.getClassId(email);
      record['class'] = classId;
      record['operationPerson'] = user._id;
      if (record && record.changeType) {
        const { changeType } = record;
        let base = 0;
        if (changeType === assetsChangeType.add) {
          base = record.money * 1
        } else if (changeType === assetsChangeType.sub) {
          base = record.money * -1
        }
        await assetsModel.findOneAndUpdate(
          { class: classId },
          { $inc: { toatlAssets: base } });
        await assetsRecordModel.create(record);
        res.status(200).send(resUtil(0))
      } else {
        res.status(200).send(resUtil('FORM_ERROR', '表单信息不完整'))
      }
    }
  } catch (err) {
    next(err)
  }
}
