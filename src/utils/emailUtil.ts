const nodemailer = require('nodemailer');

interface emailContent {
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

  public sendEmail() {
    this.transporter.sendMail({
      from: this.system,
      to: this.user,
      subject: this.subject,
      text: this.text,
      html: this.html
    }, (err, info) => {
      if (err) {
        console.log('>>>处理错误<<<:', err)
      }
      console.log('mail send ok !', info);
    })
  }
}

export default  EmailUtil;