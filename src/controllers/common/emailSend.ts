import resUtil from '../../utils/resUtil';
import Email, { emailContent } from '../../utils/emailUtil';

export default async (req, res, next) => {
  // const { email } = req.userInfo;
  const { target, emailHtml } = req.body;
  try {
    let emailContent: emailContent = {
      user: target,
      subject: '智慧班级邀请函',
      html: emailHtml
    };
    await new Email(emailContent).sendEmail()
    res.status(200).send(resUtil(0))
  } catch (e) {
    next(e)
  }
}
