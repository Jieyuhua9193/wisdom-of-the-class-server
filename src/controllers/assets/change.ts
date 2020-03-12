import assetsModel from '../../models/assets';
import resUtil from '../../utils/resUtil';
import classUtil from '../../utils/classUtil';

export default async (req, res, next) => {
  const { email } = req.userInfo;
  try {
    const classId = await classUtil.getClassId(email);
  } catch (err) {
    next(err)
  }
}