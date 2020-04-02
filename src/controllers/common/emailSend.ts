import resUtil from '../../utils/resUtil';
import classUtil from '../../utils/classUtil'
import Email, {emailContent} from '../../utils/emailUtil';
import Target from './email/target'

export default async (req, res, next) => {
  const { email } = req.userInfo;
  const { target, emailHtml, users } = req.body;
  try {
    const classId = await classUtil.getClassId(email);
    const myTarget = new Target(target, classId, users);
    const targetUsers = await myTarget.get();
    res.status(200).send(resUtil(0, targetUsers))
  } catch (e) {
    next(e)
  }
}
