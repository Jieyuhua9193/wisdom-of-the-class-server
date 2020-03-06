import userModel from '../../models/user'
import resUtil from '../../utils/resUtil'
import classUtil from '../../utils/classUtil'

export default async (req, res, next) => {
  const { email } = req.userInfo
  try {
    const classId = await classUtil.getClassId(email)
    const students = await userModel
      .find({
        $and: [
          { class: classId },
          { role: { $gt: 2 } }
        ]
      }, '-_id -__v')
    res.status(200).send(resUtil(0, students))
  } catch (err) {
    next(err)
  }
}