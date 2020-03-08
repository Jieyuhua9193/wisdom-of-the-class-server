import classModel from '../../models/class';
import userModel from '../../models/user'
import classUtil from '../../utils/classUtil';
import resUtil from '../../utils/resUtil';
import Role from '../../status/role';

export default async (req, res, next) => {
  const { email } = req.userInfo;
  const { invitationCode } = req.body;
  if (invitationCode) {
    const role = Number(invitationCode.split('-')[0]);
    const classId = invitationCode.split('-')[1];
    if (!role || !classId) {
      res.status(200).send(resUtil('CODE ERROR', '邀请码有误，请联系班主任重新获取'));
    } else if (role !== Role.teacher && role !== Role.student) {
      res.status(200).send(resUtil('CODE ERROR', '邀请码有误，请联系班主任重新获取'));
    } else {
      await userModel.findOneAndUpdate(
      { email },
      {
        $set: {
          role: role,
          class: classId
        }
      },
      async function (err, doc) {
        if (err) {
          console.log(err);
          next(err)
        }
        await classModel.findOneAndUpdate(
        { _id: classId },
        {
          $addToSet: { users: [doc._id] }
        },
        async function (err, classDoc) {
          if (err) {
            console.log(err);
            next(err)
          }
          if (!classDoc) {
            res.status(200).send(resUtil('CODE ERROR', '邀请码有误，请联系班主任重新获取'));
          } else {
            res.status(200).send(resUtil(0));
          }
        }
        );
      }
      )
    }
  } else {
    res.status(200).send(resUtil('NOT HAS INVITATION CODE', '请输入邀请码'));
  }
  const classId = await classUtil.getClassId(email)
}
