import userModel from '../../models/user';
import classModel from '../../models/class';
import resUtil from '../../utils/resUtil';
import RoleStatus from '../../status/role';

export default async (req, res, next) => {
  const { email } = req.userInfo;
  const params = req.body;
  const userInfo = params.userInfo;
  userInfo['role'] = RoleStatus.admin; // 创建班级的目前仅为admin【班主任】
  try {
    // 设置班主任的个人信息
    await userModel.findOneAndUpdate(
    { email },
    { $set: userInfo }
    );
    // 创建班级
    await classModel.create(params.classInfo)
  } catch (e) {
    next(e)
  }
  res.status(200).send(resUtil(0))
}
