import userModel from "../../models/user";
import resUtil from "../../utils/resUtil";


export default async (req, res, next) => {
  const params = req.body;
  try {
    await userModel.remove(params);
    res.status(200).send(resUtil(0))
  } catch (e) {
    next(e)
  }
}
