import classModel from '../../models/class';
import classUtil from '../../utils/classUtil';
import resUtil from '../../utils/resUtil';

export default async (req, res, next) => {
  const { email } = req.userInfo;
  try {
    const classId = await classUtil.getClassId(email);
    const classData = await classModel
      .findOne({ _id: classId }, '-_id -__v')
      .populate('users dormitories admin', '-_id -__v');
    res.status(200).send(resUtil(0, classData))
  } catch (err) {
    next(err)
  }
}
