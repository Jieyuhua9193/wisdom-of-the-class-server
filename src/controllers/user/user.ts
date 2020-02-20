import userModel from '../../models/user';
import IUserBase from '../../interface/user';
import resUtil from '../../utils/resUtil';
import Email, { emailContent } from '../../utils/emailUtil';

const bcrypt = require('bcryptjs');
const path = require('path');
const jwt = require('jsonwebtoken');
const ejs = require('ejs');
const cacheUtil = require('memory-cache');

class User {
  constructor() {
  }

  public register = async (req, res, next) => {
    const { email, password } = req.body;
    const newUser: IUserBase = {
      email: email,
      password: password
    };
    try {
      const user = await userModel.findOne({ email }, '-_id -__v');
      if (user) {
        res.status(200).send(resUtil('USER_NOT_EXIT', '该邮箱已注册，请直接登录'));
        return
      }
      await userModel.create(newUser);
    } catch (e) {
      next(e)
    }
    res.status(200).send(resUtil(0));
  };

  public sendValidateCode = async (email: string): Promise<void> => {
    const code = Math.floor(Math.random() * (9999 - 1000)) + 1000;
    await cacheUtil.put(`ver_code_${email}`, code, 60 * 1000 * 5);
    const tempPath = path.join(path.resolve('./src/template'), 'email_def.ejs');
    const RandomImage = Math.floor(Math.random() * 22) + 1;
    const imagePath = `http://qiniu.jieyuhua.top/blog/library/${RandomImage}.jpg`;
    let tempData = {
      code: code,
      img: imagePath,
      EmailDate: '2020-1-13'
    };
    const template = await ejs.renderFile(tempPath, tempData);
    let emailContent: emailContent = {
      user: email,
      subject: '智慧班级激活码',
      html: template
    };
    await new Email(emailContent).sendEmail()
  };

  public ActivateAccount = async (req, res, next) => {
    const { email, code } = req.body;
    const realCode = cacheUtil.get(`ver_code_${email}`);
    if (realCode && Number(code) === realCode) {
      try {
        await userModel.findOneAndUpdate({ email: email }, { $set: { isActivation: true } });
        res.status(200).send(resUtil(0))
      } catch (error) {
        next(error)
      }
    } else {
      res.status(200).send(resUtil('VER_CODE_ERR', '激活码错误'))
    }
  };

  public getValidateCode = async (req, res, next) => {
    const { email } = req.body;
    try {
      if (cacheUtil.get(`ver_code_${email}`)){
        res.status(200).send(resUtil('ERROR','操作频繁，请稍后重试'));
        return
      }
      await this.sendValidateCode(email);
      res.status(200).send(resUtil(0));
    } catch (e) {
      next(e)
    }
  };

  public Login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
      res.status(200).send(resUtil('PARAMS_ERROR', '参数错误'));
      return
    }
    const tokenSecret = process.env.TOKEN_SECRET;
    try {
      const user = await userModel.findOne({ email }, '-_id -__v');
      if (!user) {
        res.status(200).send(resUtil('EMAIL_NOT_FOUND', '该邮箱未注册，请注册后登录'));
        return
      }
      const flag: boolean = await bcrypt.compare(password, user.password);
      if (flag) {
        let error: any = null;
        if (!user.isActivation) {
          error = 'NEED_ACTIVATION';
        }
        let userCopy = JSON.parse(JSON.stringify(user));
        delete userCopy.password;
        let token = await jwt.sign(userCopy, tokenSecret, { algorithm: 'HS256', expiresIn: '24h' });
        let result = {
          error: error,
          user: userCopy,
          token: token
        };
        res.status(200).send(resUtil(0, result));
      } else {
        res.status(200).send(resUtil('PASSWORD_ERROR', '密码错误,请重试'));
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(resUtil(-1, '系统错误'));
    }
  };

  public setUserInfo = async (req, res, next) => {
    const { email } = req.userInfo;
    const params = req.body;
    try {
      await userModel.findOneAndUpdate({ email }, { $set: params });
      res.send(resUtil(0))
    } catch (e) {
      next(e)
    }
  };

  public getUserInfo = async (req, res, next) => {
    try {
      const { email } = req.userInfo;
      const user = await userModel.findOne({ email }, '-_id -__v -password');
      res.status(200).json(resUtil(0, user))
    } catch (e) {
      next(e);
    }
  };
}

export default new User()
