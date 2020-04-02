import getEmailTpls from './getEmailTpls';
import getEmailTplDetail from './getEmailTplDetail';
import emailSend from './emailSend'

class Student {
  constructor() { }
  public getEmailTpls = getEmailTpls;
  public getEmailTplDetail = getEmailTplDetail;
  public emailSend = emailSend
}

export default new Student()
