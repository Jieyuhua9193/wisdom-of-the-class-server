import resUtil from '../../utils/resUtil'
const path = require('path');
const fs = require('fs');

export default async (req, res, next) => {
  try {
    const { fileName } = req.body;
    const filePath = path.join(path.resolve('./src/common/emailTpl'), `${fileName}.txt`);
    await fs.readFile(filePath, 'utf-8', function (err: Error, data: any) {
      if (err) {
        console.log('read fail error', err)
      }
      res.status(200).send(resUtil(0, data))
    })
  } catch (error) {
    next(error)
  }
}
