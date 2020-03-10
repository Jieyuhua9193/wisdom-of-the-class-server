import userModel from '../../models/user'
import resUtil from '../../utils/resUtil'

const jwt = require('jsonwebtoken');

export default async (req, res, next) => {
  const { openid } = req.body;
  console.log(openid);
  try {
    const user = await userModel.findOne({ openid }, '-_id -__v');
    let code: any = 0;
    if (!user || !user.email) {
      code = 'NOT_USER';
    } else if (!user.realName) {
      code = 'NOT_USER_INFO';
    }
    let userCopy: any = null;
    let token: any = null;
    if (user) {
      userCopy = JSON.parse(JSON.stringify(user));
      delete userCopy.password;
      const tokenSecret = process.env.TOKEN_SECRET;
      console.log(userCopy, tokenSecret);
      token = await jwt.sign(userCopy, tokenSecret, { algorithm: 'HS256', expiresIn: '24h' });
    }
    let result = {
      user: userCopy,
      token: token
    };
    res.status(200).send(resUtil(code, result));
  } catch (e) {
    next(e)
  }
}
