import resUtil from '../../utils/resUtil';
import classUtil from '../../utils/classUtil'
import Email, {emailContent} from '../../utils/emailUtil';
import Target from './email/target';
import CompileHtml from './email/compileHtml';
import classModel from '../../models/class';

export default async (req, res, next) => {
  const { email } = req.userInfo;
  const { target, emailHtml, users, subject, emailConfig } = req.body;
  try {
    const classId = await classUtil.getClassId(email);
    const myTarget = new Target(target, classId, users);
    const targetUsers = await myTarget.get();
    const myClass = await classModel.findOne({ _id: classId }, 'name');

    interface User {
      email: string;
      role: number;
      realName: string;
    }

    if (!emailHtml) {
      res.status(200).send(resUtil('Compile Error', '模板编译错误'));
    } else {
      // 任务准备就绪
      res.status(200).send(resUtil(0, { count: targetUsers.length }));
    }

    try {
      let successCount: number = 0; // 成功的邮件数量
      let errorCount: number = 0; // 失败的邮件数量
      await emailHtml && targetUsers.forEach(async (user: User) => {
        const userEmail = new CompileHtml(user, emailHtml, myClass.name, emailConfig);
        const htmlTpl = userEmail.compile();
        try {
          const emailContent: emailContent = {
            user: user.email,
            subject: subject,
            html: htmlTpl
          };
          await new Email(emailContent).sendEmail();
          successCount += 1 // 成功 成功记录 + 1
        } catch (e) {
          errorCount += 1
        }
      });
    } catch (e) {
      console.log('准备阶段error:', e)
    }
  } catch (e) {
    next(e)
  }
}
