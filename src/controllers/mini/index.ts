import login from './login';
import bind from './bind'

class MiniUser {
  constructor() {
  }

  public login = login;
  public bind = bind;
}

export default new MiniUser()
