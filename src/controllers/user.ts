import userModel from '../models/user'
import IUserBase from '../interface/user'
import resUtil from '../utils/resUtil'
import Email, { emailContent } from '../utils/emailUtil'

const ejs = require('ejs');
const cacheUtil = require('memory-cache');

class User {
  constructor() {
  }

  public register = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    const newUser: IUserBase = {
      email: email,
      password: password
    };
    try {
      // await userModel.create(newUser);
      await this.sendValidateCode(newUser.email);
    } catch (e) {
      res.send(resUtil(-1))
    }
    res.status(200).send(resUtil(0))
  };

  public sendValidateCode = async (email: string): Promise<void> => {
    if (cacheUtil.get(`ver_code_${email}`))
      return;
    const code = Math.floor(Math.random() * (9999 - 1000)) + 1000;
    await cacheUtil.put(`ver_code_${email}`, code, 60 * 1000 * 5);
    await ejs.renderFile(
    '/Users/mac/Desktop/project/wisdom_server/src/template/email_def.ejs',
    { code: code },
    (err, str) => {
      let emailContent: emailContent = {
        user: email,
        subject: '智慧班级激活码',
        html: str
      };
      new Email(emailContent).sendEmail()
    }
    );
  }
}

export default new User()