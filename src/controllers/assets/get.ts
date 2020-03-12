import assetsModel from '../../models/assets';
import resUtil from '../../utils/resUtil';
import classUtil from '../../utils/classUtil';

export default async (req, res, next) => {
  const { email } = req.userInfo;
  try {
    const classId = await classUtil.getClassId(email);
    const assetsInfo = await assetsModel.findOne({ class: classId }, '-_id -class -__v')
    if (!assetsInfo) {
      await assetsModel.create({
        class: classId,
        record: []
      }, function (err, doc) {
        if (err) {
          console.log('assets err', err)
        }
        let copyDoc = JSON.parse(JSON.stringify(doc));
        delete copyDoc._id
        delete copyDoc.class
        copyDoc.total = 0
        res.status(200).send(resUtil(0, copyDoc))
      })
    } else {
      const total = await assetsModel.findOne({ class: classId }, 'record').count()
      res.status(200).send(resUtil(0, {
        assetsInfo,
        total
      }))
    }
  } catch (err) {
    next(err)
  }
}