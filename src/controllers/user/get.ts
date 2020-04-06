import userModel from '../../models/user'
import resUtil from '../../utils/resUtil'
import classUtil from '../../utils/classUtil'

export default async (req, res, next) => {
  const { email } = req.userInfo;
  // type 1 = 学生; 2 = 老师
  const { page, size, type } = req.body;
  try {
    const classId = await classUtil.getClassId(email);
    let params: object = {};
    // 组合查询条件
    if (type === 1) {
      params = {
        $and: [
          { class: classId },
          { role: { $gt: 2 } }
        ]
      }
    } else if (type === 2) {
      params = {
        $and: [
          { class: classId },
          { role: { $lte: 2 } }
        ]
      }
    } else {
      params = { class: classId }
    }
    // 计算接口数据总数
    const total = await userModel
      .find(params)
      .countDocuments();
    const users = await userModel
      .find(params)
      .skip((page - 1) * size)
      .limit(size)
      .sort({ 'role': 1 })
      .exec();
    const result = { total, users };
    res.status(200).send(resUtil(0, result))

  } catch (e) {
    next(e)
  }
}
