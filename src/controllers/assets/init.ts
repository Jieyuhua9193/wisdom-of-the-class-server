import assetsModel from '../../models/assets';
import resUtil from '../../utils/resUtil';
import classUtil from '../../utils/classUtil';

export default async (req, res, next) => {
  console.log('assets init')
  const { email } = req.userInfo;
  try {
    const classId = await classUtil.getClassId(email);
    const assetsInfo = await assetsModel.findOne({ class: classId })
    if (!assetsInfo) {
      await assetsModel.create({
        class: classId,
        record: []
      }, function (err, doc) { 
        if (err) {
          console.log('assets err', err)
        }
        console.log('assets doc', doc)
      })
    }
    req.assetsInfo = assetsInfo
  } catch (err) {
    next(err)
  }
}