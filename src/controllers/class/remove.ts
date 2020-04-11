import resUtil from '../../utils/resUtil';
import userModel from "../../models/user";

export default async (req, res, next) => {
  const { email } = req.body;
  try {
    await userModel.remove(
      { email },
      {
        $set:{
          class: null,
          role: null,
          permissions:[],
          openid: null,
          dormitory: null
        }
      }
    );
    res.status(200).send(resUtil(0))
  } catch (err) {
    next(err)
  }
}
