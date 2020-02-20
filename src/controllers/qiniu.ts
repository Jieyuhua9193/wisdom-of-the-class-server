const qiniu = require('qiniu');
import resUtil from '../utils/resUtil';

class Qiniu {
  constructor() {
  }

  public getToken = async (req, res, next) => {
    const Ak = process.env.QINIU_AK;
    const SK = process.env.QINIU_SK;
    const bucket = process.env.QINIU_BUCKET;
    const mac = new qiniu.auth.digest.Mac(Ak, SK);
    const { key } = req.body;
    const scope = key ? bucket + ':' + key : bucket;
    const options = {
      scope: scope
    };
    try {
      const putPolicy = await new qiniu.rs.PutPolicy(options);
      const uploadToken = await putPolicy.uploadToken(mac);
      res.status(200).send(resUtil(0, { token: uploadToken }));
    } catch (e) {
      next(e)
    }
  }
}

export default new Qiniu()
