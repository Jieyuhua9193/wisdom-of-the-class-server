import userModel from '../models/user'
import IUserBase from '../interface/user'

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
      res.send({
        code: -1,
        msg: '系统错误'
      })
    }
    res.send({
      code: 0,
      msg: '注册成功'
    })
  };
}

export default new User()