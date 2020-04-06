import fs from 'fs';

class FileUtil {
  private readonly path: string;

  constructor(path: string) {
    this.path = path;
  }

  public create(data: any) {
    try {
      if (this.path) {
        fs.writeFile(this.path, data, 'utf8', function (err) {
          if (err) {
            console.log('file catch error !');
            return false
          }
          console.log('缓存成功');
        })
      } else {
        console.log('file catch error！')
      }
    } catch (e) {
      console.log('system error of file catch !')
    }
  }

  public del() {
    fs.unlink(this.path, function (err) {
      if (err) {
        console.log('del error', err)
      }
      console.log('file is del !')
    })
  }
}

export default FileUtil
