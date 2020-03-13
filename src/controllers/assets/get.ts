import assetsModel from '../../models/assets';
import resUtil from '../../utils/resUtil';
import classUtil from '../../utils/classUtil';

export default async (req, res, next) => { // 获取班级总资产
  const { email } = req.userInfo;
  try {
    const classId = await classUtil.getClassId(email);
    const assetsInfo = await assetsModel.findOne({ class: classId }, 'toatlAssets -_id')
    if (!assetsInfo) {
      await assetsModel.create({
        class: classId
      }, function (err, doc) {
        if (err) {
          console.log('assets err', err)
        }
        res.status(200).send(resUtil(0, {
          toatlAssets: doc.toatlAssets
        }))
      })
    } else {
      res.status(200).send(resUtil(0, assetsInfo))
    }
  } catch (err) {
    next(err)
  }
}