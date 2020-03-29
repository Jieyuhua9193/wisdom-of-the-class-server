import userModel from '../../models/user'
import resUtil from '../../utils/resUtil'
import classUtil from '../../utils/classUtil'

export default async (req, res, next) => {
  const { email } = req.userInfo
  const { keyword } = req.body
  const reg = new RegExp(keyword, 'i')
  console.log(keyword)
  try {
    const classId = await classUtil.getClassId(email)
    const students = await userModel
      .find({
        $and: [
         { class: classId },
         { role: { $gt: 2 } }
       ],
       $or : [ //多条件，数组
        {realName : {$regex : reg}},
        {idCardNumber : {$regex : reg}},
        {phoneNumber : {$regex : reg}},
        {email : {$regex : reg}},
        {wxName : {$regex : reg}},
        {wxNumber : {$regex : reg}},
        {qq : {$regex : reg}},
        {studentId : {$regex : reg}}
    ]}, '-_id -__v')
    res.status(200).send(resUtil(0, students))
  } catch (err) {
    next(err)
  }
}