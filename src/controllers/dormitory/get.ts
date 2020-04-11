import resUtil from '../../utils/resUtil';
import classUtil from '../../utils/classUtil';
import dormitoryModel from '../../models/dormitory';

export default async (req, res, next) => {
  const { email } = req.userInfo;
  try {
    const classId = await classUtil.getClassId(email);
    const dormitories = await dormitoryModel.find(
      { class: classId },
      '-__v -class'
    );
    res.status(200).send(resUtil(0, dormitories))
  } catch (e) {
    next(e)
  }
}
