import resUtil from '../../utils/resUtil';
import userModel from '../../models/user';
import IUserBase from '../../interface/user';

export default async (req, res, next) => {
  const { email, password } = req.body;
  const newUser: IUserBase = {
    email: email,
    password: password
  };
  try {
    const user = await userModel.findOne({ email }, '-_id -__v');
    if (user) {
      res.status(200).send(resUtil('USER_NOT_EXIT', '该邮箱已注册，请直接登录'));
      return
    }
    await userModel.create(newUser);
  } catch (e) {
    next(e)
  }
  res.status(200).send(resUtil(0));
};