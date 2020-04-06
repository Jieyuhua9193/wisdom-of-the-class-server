import moment from 'moment'

interface User {
  role: number;
  realName: string;
  idCardNumber: string;
  phoneNumber: string;
  email: string;
  sex: number;
  qq?: string;
  wxName?: string;
  wxNumber?: string;
  officeAddress?: string;
  familyAddress?: string;
  studentId?: string;
}

interface Config {
  signature?: string
}

class CompileHtml {
  private readonly user: User;
  public htmlTpl: string;
  private readonly config: Config;
  private readonly classname: string;

  constructor(user: User, htmlTpl: string, classname?: string, config?: Config,) {
    this.user = user;
    this.htmlTpl = htmlTpl;
    this.config = config;
    this.classname = classname
  }

  public compile(): string {
    const call = (this.user.role > 2) ? '同学' : '老师';
    const sex = this.user.sex && (this.user.sex === 1 ? '男' : '女') || '';
    let newHtmlTpl = this.htmlTpl;
    newHtmlTpl = newHtmlTpl.replace('{{call}}', call);
    newHtmlTpl = newHtmlTpl.replace('{{realName}}', this.user.realName || '');
    newHtmlTpl = newHtmlTpl.replace('{{idCardNumber}}', this.user.idCardNumber || '');
    newHtmlTpl = newHtmlTpl.replace('{{phoneNumber}}', this.user.phoneNumber || '');
    newHtmlTpl = newHtmlTpl.replace('{{email}}', this.user.email || '');
    newHtmlTpl = newHtmlTpl.replace('{{wxName}}', this.user.wxName || '');
    newHtmlTpl = newHtmlTpl.replace('{{wxNumber}}', this.user.wxNumber || '');
    newHtmlTpl = newHtmlTpl.replace('{{sex}}', sex);
    newHtmlTpl = newHtmlTpl.replace('{{qq}}', this.user.qq || '');
    newHtmlTpl = newHtmlTpl.replace('{{officeAddress}}', this.user.officeAddress || '');
    newHtmlTpl = newHtmlTpl.replace('{{familyAddress}}', this.user.familyAddress || '');
    newHtmlTpl = newHtmlTpl.replace('{{studentId}}', this.user.studentId || '');
    newHtmlTpl = newHtmlTpl.replace(
      '{{date}}',
      moment().format('YYYY-MM-DD HH:mm:ss')
    );
    return newHtmlTpl
  }
}

export default CompileHtml
