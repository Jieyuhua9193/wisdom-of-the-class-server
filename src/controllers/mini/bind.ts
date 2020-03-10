import userModel from '../../models/user'
import resUtil from '../../utils/resUtil'

const jwt = require('jsonwebtoken');

export default async (req, res, next) => {
  const formData = req.body;
  try {
    const user = await userModel.findOne({ email: formData.email }, '-_id -__v -password');
    if (!user) {
      res.status(200).send(resUtil('BIND_ERROR', `未找到${formData.email}相关账号，绑定失败`))
    } else if (user.openid) {
      res.status(200).send(resUtil('BIND_ERROR', `该邮箱已绑定小程序，请联系管理员`))
    } else {
      await userModel.findOneAndUpdate({ email: formData.email }, { $set: formData });
      const tokenSecret = process.env.TOKEN_SECRET;
      let userCopy = JSON.parse(JSON.stringify(user));
      let token = await jwt.sign(userCopy, tokenSecret, { algorithm: 'HS256', expiresIn: '24h' });
      res.status(200).send(resUtil(0, {
        user: userCopy,
        token: token
      }))
    }
  } catch (e) {
    next(e)
  }
}
