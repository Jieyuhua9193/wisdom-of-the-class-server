import trajectoryModel from '../../models/trajectory';

export default async (user, params) => {
  try {
    await trajectoryModel.create({
      user: user,
      traceText: params.text,
      gmtCreate: params.gmtCreate,
      email: user.email
    })
  } catch (e) {
    console.error(e)
  }
}
