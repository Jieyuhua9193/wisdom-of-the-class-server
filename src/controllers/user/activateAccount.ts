import resUtil from '../../utils/resUtil';
import userModel from '../../models/user';
const cacheUtil = require('memory-cache');

export default async (req, res, next) => {
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