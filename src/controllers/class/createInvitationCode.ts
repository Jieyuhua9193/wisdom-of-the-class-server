import resUtil from '../../utils/resUtil';

const crypto = require('crypto');

export default async (req, res, next) => {
  const teacherCode = encrypt(1, 'invitation_code')
  const studentCode = encrypt(2, 'invitation_code')

  console.log('teacher', decrypt(teacherCode, 'invitation_code'))
  console.log('student', decrypt(studentCode, 'invitation_code'))

  res.status(200).send(resUtil(0,{
    teacherCode: teacherCode,
    studentCode: studentCode
  }))
}

const _Role = {
  Teacher: 1,
  Student: 2
}

function encrypt(str, secret) {
  let cipher = crypto.createCipher('aes192', secret);
  let enc = cipher.update(str, 'utf8', 'hex');
  enc +=  cipher.final('hex');
  
  return enc;
}

function decrypt(str, secret) {
  let decipher = crypto.createCipher('aes192', secret);
  let dec = decipher.update(str, 'hex', 'uft8');
  dec += decipher.final('utf8');

  return dec;
}