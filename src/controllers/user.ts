import userModel from '../models/user'
import IUserBase from '../interface/user'
import resUtil from '../utils/resUtil'
const ejs = require('ejs');

class User {
  constructor() {
  }

  public register = async (req, res) => {
    const newUser: IUserBase = {
      email: 'windy9193@163.com',
      password: 'windy888'
    };
    try {
      await userModel.create(newUser)
    } catch (e) {
      res.send(resUtil(-1))
    }
    res.status(200).send(resUtil(0))
  };
}

export default new User()