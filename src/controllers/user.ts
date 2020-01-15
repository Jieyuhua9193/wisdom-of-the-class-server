import userModel from '../models/user'
import IUserBase from '../interface/user'
import resUtil from '../utils/resUtil'
import Email, { emailContent } from '../utils/emailUtil'
const path = require('path')

const ejs = require('ejs');
const cacheUtil = require('memory-cache');

class User {
  constructor() {
  }

  public register = async (req, res) => {
    const { email, password } = req.body;
    const newUser: IUserBase = {
      email: email,
      password: password
    };
    try {
      await userModel.create(newUser);
      await this.sendValidateCode(newUser.email);
    } catch (e) {
      res.send(resUtil(-1))
    }
    res.status(200).send(resUtil(0))
    res.end()
  };

  public sendValidateCode = async (email: string): Promise<void> => {
    if (cacheUtil.get(`ver_code_${email}`))
      return;
    const code = Math.floor(Math.random() * (9999 - 1000)) + 1000;
    await cacheUtil.put(`ver_code_${email}`, code, 60 * 1000 * 5);
    const tempPath = path.join(path.resolve('./src/template'), 'email_def.ejs')
    const RandomImage = Math.floor(Math.random() * 22) + 1
    const imagePath = `http://qiniu.jieyuhua.top/blog/library/${RandomImage}.jpg`
    let tempData = {
      code: code,
      img: imagePath,
      EmailDate: '2020-1-13'
    }
    const template = await ejs.renderFile(tempPath, tempData)
    let emailContent: emailContent = {
      user: email,
      subject: '智慧班级激活码',
      html: template
    };
    await new Email(emailContent).sendEmail()
  }

  public ActivateAccount = async (req, res) => {
    const { email, code } = req.body;
    const realCode = cacheUtil.get(`ver_code_${email}`)
    if (realCode && code === realCode) {
      try {
        await userModel.findOneAndUpdate({ email: email }, { $set: { isActivationed: true } })
        res.status(200).send(resUtil(0))
      } catch (error) {
        res.status(500).send(resUtil(-1))
      }
    } else {
      res.status(400).send(resUtil(-23))
    }
    res.end()
  }

  public Login = async (req, res) => {

  }

  public setUserInfo = async (req, res) => {

  }

  public getUserInfo = async (req, res) => {
    
  }
}

export default new User()