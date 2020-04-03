const cacheUtil = require('memory-cache');
const ejs = require('ejs');
const path = require('path');
import Email, { emailContent } from '../../utils/emailUtil';
import moment from 'moment';

export default async (email: string): Promise<void> => {
  const code = Math.floor(Math.random() * (9999 - 1000)) + 1000;
  await cacheUtil.put(`ver_code_${email}`, code, 60 * 1000 * 5);
  const tempPath = path.join(path.resolve('./src/template'), 'email_def.ejs');
  const RandomImage = Math.floor(Math.random() * 22) + 1;
  const imagePath = `http://qiniu.jieyuhua.top/blog/library/${RandomImage}.jpg`;
  let tempData = {
    code: code,
    img: imagePath,
    EmailDate: moment().format('YYYY-MM-DD HH:mm:ss')
  };
  const template = await ejs.renderFile(tempPath, tempData);
  let emailContent: emailContent = {
    user: email,
    subject: '智慧班级激活码',
    html: template
  };
  await new Email(emailContent).sendEmail()
};
