import userModel from '../../models/user';
import classModel from '../../models/class';
import resUtil from '../../utils/resUtil';
import RoleStatus from '../../status/role';

export default async (req, res, next) => {
  const { email } = req.userInfo;
  const params = req.body;
  try {
    let userInfo = params.userInfo;
    let classInfo = params.classInfo
    // 创建班级
    const user_id = await userModel.findOne({ email }, '_id')
    classInfo['users'] = [user_id] // 添加到班级中
    classInfo['admin'] = user_id // 标记创建者为admin【班主任】
    await classModel.create(classInfo)
    // 设置班主任的个人信息
    const class_id = await classModel.findOne({admin: user_id}, '_id')
    userInfo['role'] = RoleStatus.admin; // 创建班级的目前仅为admin【班主任】
    userInfo['class'] = class_id // 关联班级
    await userModel.findOneAndUpdate(
    { email },
    { $set: userInfo }
    );
    res.status(200).send(resUtil(0))
  } catch (e) {
    next(e)
  }
}
