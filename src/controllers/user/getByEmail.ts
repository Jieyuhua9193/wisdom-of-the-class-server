import resUtil from '../../utils/resUtil';
import userModel from '../../models/user';

export default async (req, res, next) => {
  try {
    const { email } = req.userInfo;
    const user = await userModel.findOne({ email }, '-_id -__v -password');
    res.status(200).json(resUtil(0, user))
  } catch (e) {
    next(e);
  }
};