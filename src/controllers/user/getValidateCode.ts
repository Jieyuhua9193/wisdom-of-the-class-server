import resUtil from '../../utils/resUtil';
import sendValidateCode from './sendValidateCode';

const cacheUtil = require('memory-cache');

export default async (req, res, next) => {
  const { email } = req.body;
  try {
    if (cacheUtil.get(`ver_code_${email}`)){
      res.status(200).send(resUtil('ERROR','操作频繁，请稍后重试'));
      return
    }
    await sendValidateCode(email);
    res.status(200).send(resUtil(0));
  } catch (e) {
    next(e)
  }
};