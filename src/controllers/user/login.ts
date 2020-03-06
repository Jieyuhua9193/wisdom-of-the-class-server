import resUtil from '../../utils/resUtil';
import userModel from '../../models/user';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


export default async (req, res) => {
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