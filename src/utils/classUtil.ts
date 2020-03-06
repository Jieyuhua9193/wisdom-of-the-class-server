import userModel from '../models/user'

export default {
  getClassId: async (email) => {
    const user = await userModel.findOne({ email }, 'class');
    if (user && user.class) {
      return user.class
    }
    return null
  }
}