const path = require('path');
import resUtil from '../../utils/resUtil';

export default async (req, res, next) => {
  const filePath = path.join(path.resolve('./src/common/excelTpl'), 'user.xlsx');
  try {
    res.download(filePath, '角色批量导入模板.xlsx', function (err) {
      if (err) {
        console.log('err', err)
      }
      console.log('download ok')
    })
  } catch (e) {
    next(e);
  }
};