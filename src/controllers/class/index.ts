import create from './create'
import createInvitationCode from './createInvitationCode'

class MyClass {
  constructor() {
  }
  public create = create
  public createInvitationCode = createInvitationCode
}

export default new MyClass()
