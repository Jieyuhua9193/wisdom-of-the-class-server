import userModel from '../../models/user';
import classModel from '../../models/class';
import dormitoryModel from '../../models/dormitory';
import resUtil from '../../utils/resUtil';
import RoleStatus from '../../status/role';

export default async (req, res, next) => {
  const { email } = req.userInfo;
  const params = req.body;
  try {
    let userInfo = params.userInfo;
    let classInfo = params.classInfo
    let dormitories = JSON.parse(JSON.stringify(classInfo.dormitories));
    // 创建班级
    delete classInfo.dormitories
    const user_id = await userModel.findOne({ email }, '_id')
    classInfo['users'] = [user_id] // 添加到班级中
    classInfo['admin'] = user_id // 标记创建者为admin【班主任】
    await classModel.create(classInfo, async function (err, doc) {
      if (err) {
        console.log(err)
      }
      const class_id = doc._id
      // 设置班主任的个人信息
      userInfo['role'] = RoleStatus.admin; // 创建班级的目前仅为admin【班主任】
      userInfo['class'] = class_id // 关联班级
      await userModel.findOneAndUpdate(
        { email },
        { $set: userInfo }
      );
      // 创建寝室
      dormitories = dormitories.map(item => {
        return {
          'class': class_id,
          ...item
        }
      })
      await dormitoryModel.insertMany(dormitories)
      // 关联寝室&生成邀请码
      const invitationCode = {
        teacher: `${0}-${class_id}`,
        student: `${1}-${class_id}`
      }
      const dormitoryIds = await dormitoryModel.find({ class: class_id }, '_id')
      await classModel.findOneAndUpdate(
        { _id: class_id },
        {
          $set: {
            invitationCode: invitationCode,
            dormitories: dormitoryIds
          }
        }
      );
      res.status(200).send(resUtil(0, doc))
    })
  } catch (e) {
    next(e)
  }
}
