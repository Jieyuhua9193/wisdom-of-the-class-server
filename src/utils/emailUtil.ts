const nodemailer = require('nodemailer');

export interface emailContent {
  user: string,
  subject: string,
  text?: string,
  html?: string
}

class EmailUtil {
  private config = {
    host: 'smtp.126.com',
    port: 25,
    secureConnection: true,
    auth: {
      user: 'cms__helper@126.com',
      pass: 'cmshelper666'
    }
  };
  private transporter = nodemailer.createTransport(this.config);
  private system = '智慧班级小助手<cms__helper@126.com>';
  public user: string;
  public subject: string;
  public text: string;
  public html: string;

  constructor(emailContent: emailContent) {
    this.user = emailContent.user;
    this.subject = emailContent.subject;
    this.text = emailContent.text || null;
    this.html = emailContent.html || null;
  }

  public getEmailContent(): object {
    let retult = {
      from: this.system,
      to: this.user,
      subject: this.subject,
    };
    if (this.text){
      retult['text'] = this.text
    } else {
      retult['html'] = this.html
    }
    return retult
  }

  public sendEmail() {
    const content = this.getEmailContent();
    console.log(content);
    this.transporter.sendMail(content, (err, info) => {
      if (err) {
        console.log('>>>处理错误<<<:', err)
      } else {
        console.log('mail send ok !', info);
      }
    })
  }
}

export default EmailUtil;