import classUtil from "../../utils/classUtil";
import activeModel from '../../models/active';
import resUtil from "../../utils/resUtil";

export default async (req, res, next) => {
  const params = req.body;
  const { email } = req.userInfo;
  try {
    const classId = await classUtil.getClassId(email);
    let newActive = {
      ...params,
      class: classId,
      createUser: req.userInfo
    };
    await activeModel.create(newActive);
    res.status(200).send(resUtil(0))
  } catch (e) {
    next(e)
  }
}
