import moment from 'moment'

interface User {
  role: number;
  realName: string;
}

interface Config {
  date?: string;
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
    const roleAlias = (this.user.role > 2) ? '同学' : '老师';
    const date = (this.config && this.config.date) || moment().format('YYYY-MM-DD HH:mm:ss');
    const signature = (this.config && this.config.signature) || this.classname || '智慧班级小助手';
    const call = this.user.realName + roleAlias;
    let newHtmlTpl = this.htmlTpl;
    newHtmlTpl = newHtmlTpl.replace('{{默认姓名+角色，暂不支持自定义}}', call);
    newHtmlTpl = newHtmlTpl.replace('{{默认班级名称}}', signature);
    newHtmlTpl = newHtmlTpl.replace('{{默认邮件发送时间}}', date);
    return newHtmlTpl
  }
}

export default CompileHtml
