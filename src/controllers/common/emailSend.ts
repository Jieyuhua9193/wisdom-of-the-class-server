import resUtil from '../../utils/resUtil';
import classUtil from '../../utils/classUtil';
import FileUtil from '../../utils/fileUtil';
import Email, {emailContent} from '../../utils/emailUtil';
import Target from './email/target';
import CompileHtml from './email/compileHtml';
import classModel from '../../models/class';
import emailModel from "../../models/email";
const path = require('path');

export default async (req, res, next) => {
  const { email } = req.userInfo;
  const { target, emailHtml, subject, emailConfig } = req.body;
  try {
    const classId = await classUtil.getClassId(email);
    const myTarget = new Target(target, classId);
    const targetUsers = await myTarget.get();
    const myClass = await classModel.findOne({ _id: classId }, 'name');

    interface User {
      role: number;
      realName: string;
      idCardNumber: string;
      phoneNumber: string;
      email: string;
      sex: number;
      qq?: string;
      wxName?: string;
      wxNumber?: string;
      officeAddress?: string;
      familyAddress?: string;
      studentId?: string;
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
      let errorUser: object[] = [];
      let catchPath: string; // 邮件缓存地址
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
          errorCount += 1;
          errorUser.push(user)
        }
      });

      if (errorCount) {
        // 存在邮件发送失败，缓存邮件，等待管理员确认重新发送
        const unx = new Date().getTime();
        catchPath = path.join(
          path.resolve(
            './src/catch/email',
            `${email}${unx}.txt`
          )
        );
        const EmailFile = new FileUtil(catchPath);
        EmailFile.create(emailHtml)
      }

      // 存储邮件发送记录
      let emailRecord = {
        class: classId,
        target: target,
        emailHtml: catchPath,
        subject: subject,
        successCount: successCount,
        errorCount: errorCount,
        errorUser: errorUser,
        operation: req.userInfo
      };
      await emailModel.create(emailRecord)
    } catch (e) {
      console.log('准备阶段error:', e)
    }
  } catch (e) {
    next(e)
  }
}
