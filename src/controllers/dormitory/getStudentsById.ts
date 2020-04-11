import resUtil from '../../utils/resUtil';
import userModel from "../../models/user";

export default async (req, res, next) => {
  const { id } = req.body;
  try {
    const students = await userModel.find(
      { dormitory: id },
      'realName email _id'
    );
    res.status(200).send(resUtil(0, students))
  } catch (e) {
    next(e)
  }
}
