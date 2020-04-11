import resUtil from '../../utils/resUtil';
import userModel from '../../models/user';

export default async (req, res, next) => {
  try {
    const { email } = req.body;
    const user =
      await userModel.findOne(
        { email },
        '-_id -__v -password'
      ).populate('dormitory', '-class -__v');
    res.status(200).json(resUtil(0, user))
  } catch (e) {
    next(e);
  }
};
