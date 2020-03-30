const XLSX = require('xlsx');
const Busboy = require('busboy');
import resUtil from '../../utils/resUtil';
import classUtil from '../../utils/classUtil';
import userModel from '../../models/user';

export default async (req, res, next) => {
  try {
    const { email } = req.userInfo
    const classId = await classUtil.getClassId(email)
    let busboy = await new Busboy({
      headers: req.headers,
      limits: {
        files: 1,
        fileSize: 50000000
      }
    })
    req.pipe(busboy);
    await busboy.on('file', async function (fieldname, file, filename, encoding, mimetype) {
      console.log('导入准备中>>>>>')
      await file.on('limit', function () {
        res.status(200).send(resUtil('IMPORT_FAIL', '导入失败，文件大小超过限制'))
      })
      await file.on('data', async function (data) {
        console.log('解析数据>>>>>')
        console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
        let workbook = XLSX.read(data);
        let sheetNames = workbook.SheetNames; // 返回 ['sheet1', 'sheet2',……]
        let worksheet = workbook.Sheets[sheetNames[0]]; // 获取excel的第一个表格
        let ref = worksheet['!ref']; //获取excel的有效范围,比如A1:F20
        let reg = /[a-zA-Z]/g;
        ref = ref.replace(reg, "");
        let line = parseInt(ref.split(':')[1]); // 获取excel的有效行数
        console.log("line====>", line);
        let count = 0
        let result = []
        for (let i = 2; i <= line; i++) {
          if (!worksheet['A' + i] || !worksheet['E' + i] || !worksheet['F' + i]) {
            break;
          }
          let arrayItem: any = {}
          arrayItem.password = worksheet['B' + i] && worksheet['B' + i].w || ''
          arrayItem.idCardNumber = worksheet['C' + i] && worksheet['C' + i].w || ''
          arrayItem.phoneNumber = worksheet['D' + i] && worksheet['D' + i].w || ''
          arrayItem.email = worksheet['E' + i] && worksheet['E' + i].w || ''
          arrayItem.realName = worksheet['A' + i] && worksheet['A' + i].w || ''
          arrayItem.role = worksheet['F' + i] && worksheet['F' + i].v || ''
          arrayItem.sex = worksheet['G' + i] && worksheet['G' + i].v || ''
          arrayItem.qq = worksheet['H' + i] && worksheet['H' + i].w || ''
          arrayItem.officeAddress = worksheet['I' + i] && worksheet['I' + i].w || ''
          arrayItem.studentId = worksheet['J' + i] && worksheet['J' + i].w || ''
          arrayItem.familyAddress = worksheet['K' + i] && worksheet['K' + i].w || ''
          arrayItem.class = classId
          result.push(arrayItem)
          count++;
        }
        result.filter(d => d)
        console.log(result)
        try {
          await userModel.insertMany(result)
          res.status(200).send(resUtil(0, { count }))
        } catch (error) {
          next(error)
        }
      })
      await file.on('end', function () {
        console.log(`File [${fieldname}] Finished`)
        console.log('执行完成>>>>')
      })
    })
  } catch (e) {
    next(e);
  }
};