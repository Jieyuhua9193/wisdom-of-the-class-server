import resUtil from '../utils/resUtil'
import noAuthApis from '../../config/noAuthApis'

const jwt = require('jsonwebtoken');

export default (req, res, next) => {
  const { token } = req.headers;
  const url = req.url;
  if (noAuthApis.includes(url)) {
    next()
  } else {
    auth(token, req, res, next)
  }
}

const auth = (token: string, req, res, next): void => {
  const tokenSecret = process.env.TOKEN_SECRET;
  if (!token) {
    res.status(403).send(resUtil('NEED_LOGIN', '登录后操作'));
  } else {
    jwt.verify(token, tokenSecret, (err, decoded) => {
      if (err) {
        console.log(err);
        res.status(403).send(resUtil('LOGIN_Expired', '登录信息过期，请重新登录'));
        res.end();
        return
      } else {
        req.userInfo = decoded;
        next()
      }
    })
  }
};
